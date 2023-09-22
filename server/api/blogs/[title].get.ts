import { serverSupabaseClient } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

interface blog {
    id: string
    title: string
    image_url: string
    created_at: string
    category_id: string
}
interface category {
    id: string
    name: string
}
interface tag {
    id: string
    name: string
}

const fetchBlogData = async (client: SupabaseClient, title: string | undefined): Promise<GetBlogDetail | {}> => {
    try {
        const { data: blogs } = await client
            .from('posts')
            .select('id, title,text, image_url, created_at, category_id, url_param')
            .eq('url_param', title);

        if (!blogs || blogs.length === 0) {
            throw new Error('Blog not found');
        }

        const blog = blogs[0];

        const { data: categories } = await client.from('categories').select('*').eq('id', blog.category_id);

        if (!categories || categories.length === 0) {
            throw new Error('Category not found');
        }

        const { data: postTagsData } = await client.from('post_tags').select('tag_id').eq('post_id', blog.id);
        const tagIds = postTagsData?.map((item: { tag_id: string }) => item.tag_id);

        const { data: tagsData } = await client.from('tags').select('*').in('id', tagIds || []);

        const tags = tagsData || [];

        return {
            ...blog,
            category: categories[0].name,
            tags: tags,
        };
    } catch (error: any) {
        throw new Error(error);
    }
};



export default eventHandler(async (event): Promise<BlogSnapshot> => {
    const client = await serverSupabaseClient(event);
    const title = event.context.params?.title.toString()

    try {
        const blog = await fetchBlogData(client, title);
        return { data: blog };

    } catch (error: any) {
        console.error(error);
        throw new Error(error);
    }
});
