import { serverSupabaseClient } from '#supabase/server';

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);

    try {
        const postId = event.context.params?.postId.toString()

        const { data: comments } = await client
            .from('comments')
            .select('*, public_users(name, avatar_url)')
            .eq('post_id', postId);

        return {
            comments
        }
    } catch (error) {
        console.error(error)
    }

})