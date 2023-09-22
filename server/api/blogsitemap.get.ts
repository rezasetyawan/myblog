import { serverSupabaseClient } from '#supabase/server'

interface BlogSitemap {
    url: string
    updated_at: string
}
export default eventHandler(async (event): Promise<BlogSitemap[]> => {
    const config = useRuntimeConfig()
    const client = await serverSupabaseClient(event);
    try {
        let queryBuilder = client.from('posts').select('short_title, updated_at').order('created_at', { ascending: false });

        const { data: blogs, error } = await queryBuilder.eq('is_published', true)

        if (error) {
            console.error(error.message);
            throw new Error(error.message);
        }

        const data = blogs.map((blog) => {
            return { url: `${config.public.siteUrl}/${blog.short_title}`, updated_at: blog.updated_at }
        })

        return data
    } catch (error: any) {
        throw new Error(error);
    }
});

