import { nanoid } from "nanoid"
import { SupabaseClient } from '@supabase/supabase-js';

const getBlogs = async (search_key: string = "", category_id: string = "", tags: string[] = [], page: number = 1, cacheKey: string = "/blogs") => {
    try {
        const { data } = await useFetch('/api/blogs', {
            query: {
                search_key: search_key,
                category_id: category_id,
                tags: tags,
                page: page
            },
            key: cacheKey,
        })
        return data.value
    } catch (error) {
        console.error(error)
    }
}


const getBlogById = async (id: string) => {
    console.log(id)
    try {
        const { data } = await useFetch(`/api/blogs/${id}`, {
            key: `${id}`
        })
        return data.value?.data as GetBlogDetail
    } catch (error) {
        console.error(error)
    }
}

const addBlog = async (client: SupabaseClient, postId: string, postData: AddBlog, postTags: string[]) => {
    try {
        await client.from('posts').insert(postData as never).select('id')

        const tagArrayPromises = postTags.map((tagId) => {
            const id = `post_tag-${nanoid(5)}`
            client.from('post_tags').insert({ id: id, post_id: postId, tag_id: tagId } as never)
        })

        Promise.all(tagArrayPromises)
    } catch (error) {
        console.error(error)
    }
}
export { getBlogs, getBlogById, addBlog }