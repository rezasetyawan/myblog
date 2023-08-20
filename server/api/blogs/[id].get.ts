import { serverSupabaseClient } from '#supabase/server';

const fetchBlogData = async (client: any, blogId: string | null) => {
    const { data: blogs, error } = await client
        .from('posts')
        .select('id, title, text, image_url, created_at, category_id')
        .eq('id', blogId);

    if (error) {
        throw new Error(error.message);
    }

    const { data: categories } = await client.from('categories').select('*').eq('id', blogs[0].category_id);
    // const { data: comments } = await client
    //     .from('comments')
    //     .select('*, public_users(name, avatar_url)')
    //     .eq('post_id', blogId);

    const { data: postTagsData } = await client.from('post_tags').select('tag_id').eq('post_id', blogId);
    const tagIds = postTagsData.map((item: any) => item.tag_id);
    const { data: tagsData } = await client.from('tags').select('*').in('id', tagIds);

    const tags = tagsData || [];

    return {
        blogs: blogs[0],
        categories: categories[0],
        // comments: comments || [],
        tags: tags || [],
    };
};

export default eventHandler(async (event): Promise<BlogSnapshot> => {
    const client = await serverSupabaseClient(event);
    const id = event.context.params?.id.toString() || null

    try {
        const { blogs, categories, tags } = await fetchBlogData(client, id);

        const post: GetBlogDetail = {
            ...blogs,
            category: categories.name,
            // comments,
            tags,
            // comment_counts: comments.length,
        };

        return { post };
    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
});
