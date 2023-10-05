import { serverSupabaseClient } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js';

interface Comment {
    id: string;
    replies?: Comment[];
}

const getCommentCounts = async (client: SupabaseClient, postId: string) => {
    let totalCount = 0;

    const fetchNestedReplies = async (client: SupabaseClient, parentCommentId: string) => {
        try {
            const { data, error } = await client.from("comments").select('id').eq("parent_id", parentCommentId)

            if (error) {
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
            throw new Error(error.message)
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
                return { comments: [], totalCount: 0 };
            }

            const commentsWithReplies: Comment[] = [];

            for (const comment of comments) {
                const nestedReplies = await fetchNestedReplies(client, comment.id);

                commentsWithReplies.push({
                    ...comment,
                    replies: nestedReplies
                });
                totalCount++;
                totalCount += nestedReplies.length;
            }

            return
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    await fetchTopLevelComments(client, postId)
    return totalCount
}

const getPagination = (page: number = 1, size: number = 1) => {
    
        const limit = size ? +size : 12
        const from = page ? (page - 1) * limit : 0
        const to = page ? from + size - 1 : size - 1
        return { from, to }
    
}

export default eventHandler(async (event): Promise<BlogSnapshots> => {
    const client = await serverSupabaseClient(event);
    const query = getQuery(event);
    const size = 6;

    const tags: string[] = Array.isArray(query.tags) ? query.tags : typeof query.tags === 'string' ? [query.tags] : [];

    const { from, to } = getPagination(query.page ? parseInt(query.page as string) : 0, size)

    try {
        let queryBuilder = client.from('posts').select('id, title, created_at, image_url, is_published, url_param', { count: 'exact' }).order('created_at', { ascending: false });

        if (tags.length > 0 || query.category_id || query.search_key) {
            if (tags.length > 0) {
                const { data: post } = await client.from('post_tags').select('post_id').in('tag_id', tags);

                const postIds: string[] = post
                    ? post.map((obj) => obj.post_id).filter((value, index, self) => self.indexOf(value) === index)
                    : [];

                if (postIds.length > 0) {
                    queryBuilder = queryBuilder.in("id", postIds);
                }
            }

            if (query.category_id) {
                queryBuilder = queryBuilder.eq('category_id', query.category_id);
            }

            if (query.search_key) {
                queryBuilder = queryBuilder.ilike('title', `%${query.search_key}%`);
            }
        }

        if (tags.length === 0 && !query.category_id && !query.search_key) {
            queryBuilder = queryBuilder;
        }

        if (tags.length > 0 && query.category_id && query.search_key) {
            const { data: post } = await client.from('post_tags').select('post_id').in('tag_id', tags);

            const postIds: string[] = post
                ? post.map((obj) => obj.post_id).filter((value, index, self) => self.indexOf(value) === index)
                : [];

            if (postIds.length > 0) {
                queryBuilder = queryBuilder.in("id", postIds);
            }

            queryBuilder = queryBuilder.eq('category_id', query.category_id).ilike('title', `%${query.search_key}%`);
        }

        const { data, count, error } = await queryBuilder.range(from,to)

        if (error) {
            console.error(error.message);
            throw new Error(error.message);
        }

        const blogs = await Promise.all(data.map(async (blog) => {
            const counts = await getCommentCounts(client, blog.id);
            return { ...blog, comment_counts: counts };
        }));

        return { blogs: blogs, totalPage: count ? Math.ceil(count / size) : 1 }

    } catch (error: any) {
        throw new Error(error.message);
    }
});
