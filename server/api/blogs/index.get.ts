import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event): Promise<BlogSnapshots> => {
    const client = await serverSupabaseClient(event)
    try {
        const { data: blogs, error } = await client.from('posts').select('id, title, created_at, image_url')
        if (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
        return { posts: blogs }
    } catch (error: any) {
        throw new Error(error)
    }
})