import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

let totalCount = 0;

const getRoleByUUID = async (uuid: string, client: SupabaseClient) => {
    const { data, error } = await client.rpc('get_claim', {
        uid: uuid, claim: 'userrole'
    })

    if (error) {
        return 'user'
    }

    return data
}

const fetchNestedReplies = async (client: SupabaseClient, parentCommentId: string) => {
    const { data, error } = await client.from("comments").select('*, public_users(id, name, avatar_url)').eq("parent_id", parentCommentId)

    if (error) {
        return []
    }

    const replies = []
    for (const reply of data) {
        const nestedReplies = await fetchNestedReplies(client, reply.id);
        console.log('ini user id ' + reply.public_users.id )
        const userRole = await getRoleByUUID(reply.public_users.id, client)
        reply.replies = nestedReplies
        reply.public_users.user_role = userRole
        replies.push(reply)
        totalCount += nestedReplies.length
    }

    return replies
}

const fetchTopLevelComments = async (client: SupabaseClient, postId: string | undefined) => {
    const { data: comments, error } = await client.from('comments').select('*, public_users(id, name, avatar_url)')
        .eq('post_id', postId).is('parent_id', null)

    if (error) {
        return { comments: [], comment_counts: 0 };
    }

    const commentsWithReplies = [];

    for (const comment of comments) {
        const nestedReplies = await fetchNestedReplies(client, comment.id)
        const userRole = await getRoleByUUID(comment.public_users.id, client)
        comment.replies = nestedReplies;
        comment.public_users.user_role = userRole
        commentsWithReplies.push(comment);
        totalCount++;

        totalCount += nestedReplies.length;
    }

    return {
        comments: commentsWithReplies,
        comment_counts: totalCount
    };
}


export default eventHandler(async (event): Promise<CommentSnapshots> => {
    const client = await serverSupabaseClient(event);

    try {
        const postId = event.context.params?.postId.toString()
        const data = await fetchTopLevelComments(client, postId)
        totalCount = 0
        return data
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }

})