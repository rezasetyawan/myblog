import { serverSupabaseClient } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js';

interface Comment {
    id: string;
    replies?: Comment[]; // Make replies property optional
    // Other properties as needed
}

const getCommentCounts = async (client: SupabaseClient, postId: string) => {
    let totalCount = 0;

    const fetchNestedReplies = async (client: SupabaseClient, parentCommentId: string) => {
        try {
            const { data, error } = await client.from("comments").select('id').eq("parent_id", parentCommentId)

            if (error) {
                console.error(error)
                return []
            }

            const replies: Comment[] = [];
            for (const reply of data) {
                const nestedReplies = await fetchNestedReplies(client, reply.id);
                replies.push({
                    ...reply,
                    replies: nestedReplies
                });
                totalCount += nestedReplies.length
            }

            return replies
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const fetchTopLevelComments = async (client: SupabaseClient, postId: string | undefined) => {
        try {
            const { data: comments, error } = await client
                .from('comments')
                .select('id')
                .eq('post_id', postId)
                .is('parent_id', null);

            if (error) {
                console.error(error);
                return { comments: [], totalCount: 0 };
            }

            const commentsWithReplies: Comment[] = [];

            for (const comment of comments) {
                const nestedReplies = await fetchNestedReplies(client, comment.id);
                commentsWithReplies.push({
                    ...comment,
                    replies: nestedReplies
                });
                totalCount += nestedReplies.length;
            }
            return; // Don't forget to return a value here
        } catch (error: any) {
            throw new Error(error);
        }
    }

    await fetchTopLevelComments(client, postId)
    return totalCount
}


export default eventHandler(async (event): Promise<BlogSnapshots> => {
    const client = await serverSupabaseClient(event);
    const query = getQuery(event);

    try {
        let queryBuilder = client.from('posts').select('id, title, created_at, image_url').order('created_at', { ascending: false });

        if (query.category_id || query.search_key) {
            query.category_id ? queryBuilder = queryBuilder.eq('category_id', query.category_id) : queryBuilder = queryBuilder.ilike('title', `%${query.search_key}%`)
        }

        if (!query.category_id && !query.search_key) {
            queryBuilder = queryBuilder
        }

        if (query.category_id && query.search_key) {
            queryBuilder = queryBuilder.eq('category_id', query.category_id).ilike('title', `%${query.search_key}%`);;
        }

        const { data, error } = await queryBuilder;

        if (error) {
            console.error(error.message);
            throw new Error(error.message);
        }

        const blogs = await Promise.all(data.map(async (blog) => {
            const counts = await getCommentCounts(client, blog.id);
            console.log(counts);

            return { ...blog, comment_counts: counts };
        }));

        return { data: blogs };

    } catch (error: any) {
        throw new Error(error);
    }
});
