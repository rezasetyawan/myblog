import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

let totalCount = 0;

const fetchNestedReplies = async (client: SupabaseClient, parentCommentId: string) => {
    const { data, error } = await client.from("comments").select('*, public_users(name, avatar_url)').eq("parent_id", parentCommentId)

    if (error) {
        console.error(error)
        return []
    }

    const replies = []
    for (const reply of data) {
        const nestedReplies = await fetchNestedReplies(client, reply.id);
        reply.replies = nestedReplies
        replies.push(reply)
        totalCount += nestedReplies.length
    }

    return replies
}

const fetchTopLevelComments = async (client: SupabaseClient, postId: string | undefined) => {
    const { data: comments, error } = await client.from('comments').select('*, public_users(name, avatar_url)')
        .eq('post_id', postId).is('parent_id', null)
    if (error) {
        console.error(error)
        return { comments: [], totalCount: 0 };
    }



    const commentsWithReplies = [];

    for (const comment of comments) {
        const nestedReplies = await fetchNestedReplies(client, comment.id)
        comment.replies = nestedReplies;
        commentsWithReplies.push(comment);
        totalCount++;

        totalCount += nestedReplies.length;
    }

    return {
        comments: commentsWithReplies,
        comment_counts: totalCount
    };
}


export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    try {
        const postId = event.context.params?.postId.toString()
        const data = await fetchTopLevelComments(client, postId)

        console.log(data)
        totalCount = 0
        return data

    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }

})