import { nanoid } from "nanoid"
import { SupabaseClient } from '@supabase/supabase-js';

const getBlogs = async (search_key: string = "", category_id: string = "", tags: string[] = [], page: number = 1, cacheKey: string = "/blogs") => {
    try {
        const { data } = await useFetch('/api/author/posts', {
            method:'GET',
            query: {
                search_key: search_key,
                category_id: category_id,
                tags: tags,
                page: page
            },
            key: cacheKey,
        })
        console.log(data.value)
        return data.value as BlogSnapshots
    } catch (error) {
        console.error(error)
    }
}

const getAuthorBlogs = async (search_key: string = "", category_id: string = "", tags: string[] = [], page: number = 1, cacheKey: string = "/blogs") => {
    try {
        const { data } = await useFetch('/api/author/posts', {
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
    try {
        const { data } = await useFetch(`/api/blogs/${id}`, {
            key: `${id}`
        })
        return data.value?.data as GetBlogDetail
    } catch (error) {
        console.error(error)
    }
}

const getBlogData = async (id: string) => {
    try {
        const { data } = await useFetch(`/api/author/posts/${id}`, {
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
            return client.from('post_tags').insert({ id: id, post_id: postId, tag_id: tagId } as never)
        })
        await Promise.all(tagArrayPromises)

    } catch (error) {
        console.error(error)
    }
}

const updateBlogById = async (client: SupabaseClient, postId: string, postData: UpdateBlog) => {
    try {
        await client.from('posts').update(postData).eq('id', postId)
        return
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

const deleteBlogByID = async (client: SupabaseClient, postId: string) => {
    try {
        await client.from('posts').delete().eq('id', postId)
        return
    } catch (error) {
        console.error(error)
    }
}

const updateBlogTagsById = async (client: SupabaseClient, postId: string, postTags: string[]) => {
    try {
        await client.from('post_tags').delete().eq('post_id', postId)

        const tagArrayPromises = postTags.map((tagId) => {
            const id = `post_tag-${nanoid(5)}`
            return client.from('post_tags').insert({ id: id, post_id: postId, tag_id: tagId } as never)
        })
        await Promise.all(tagArrayPromises)
    }
    catch (error) {
        console.error(error)
    }

}
export { getBlogs, getBlogById, addBlog, getAuthorBlogs, updateBlogById, getBlogData, deleteBlogByID, updateBlogTagsById }