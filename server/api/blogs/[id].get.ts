import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event): Promise<BlogSnapshot> => {
    const client = await serverSupabaseClient(event)
    const { id } = event.context.params
    try {
        const { data: blogs, error } = await client.from('posts').select('*').eq("id", id)
        if (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
        return { post: blogs[0] }
    } catch (error: any) {
        throw new Error(error)
    }
})