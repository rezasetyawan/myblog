import { nanoid } from "nanoid"
import { SupabaseClient } from '@supabase/supabase-js';

const getBlogs = async (search_key: string = "", category_id: string = "", tags: string[] = [], page: number = 1, cacheKey: string = "/") => {
    try {
        const { data, error } = await useFetch('/api/blogs', {
            method: 'GET',
            query: {
                search_key: search_key,
                category_id: category_id,
                tags: tags,
                page: page
            },
            key: cacheKey,
        })

        if (error.value) {
            throw new Error(error.value?.message)
        }
        return data.value as BlogSnapshots
    } catch (error) {
        throw new Error(error as any)
    }
}

const getAuthorBlogs = async (search_key: string = "", category_id: string = "", tags: string[] = [], page: number = 1, cacheKey: string = "/blogs") => {
    try {
        const { data, error } = await useFetch('/api/author/posts', {
            query: {
                search_key: search_key,
                category_id: category_id,
                tags: tags,
                page: page
            },
            key: cacheKey,
        })

        if (error.value) {
            throw new Error(error.value?.message)
        }
        return data.value
    } catch (error) {
        throw new Error(error as any)
    }
}

const getBlogByTitle = async (title: string) => {
    try {
        const { data, error } = await useFetch(`/api/blogs/${title}`, {
            key: `${title}`
        })

        if (error.value) {
            throw new Error(error.value?.message)
        }

        return data.value?.data as GetBlogDetail
    } catch (error) {
        throw new Error(error as any)
    }
}

const addBlog = async (client: SupabaseClient, postId: string, postData: AddBlog, postTags: string[]) => {
    try {
        const { data, error } = await client.from('posts').insert(postData as never).select('id')

        if (error) {
            throw new Error(error.message)
        }

        const tagArrayPromises = postTags.map((tagId) => {
            const id = `post_tag-${nanoid(5)}`
            return client.from('post_tags').insert({ id: id, post_id: postId, tag_id: tagId } as never)
        })
        await Promise.all(tagArrayPromises)

    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const updateBlogById = async (client: SupabaseClient, postId: string, postData: UpdateBlog) => {
    try {

        const { error } = await client.from('posts').update(postData).eq('id', postId)

        if (error) {
            throw new Error(error.message)
        }
        return
    } catch (error) {
        throw new Error(error as any)
    }
}

const deleteBlogByID = async (client: SupabaseClient, postId: string) => {
    try {
        const { error } = await client.from('posts').delete().eq('id', postId)

        if (error) {
            throw new Error(error.message)
        }
        return
    } catch (error) {
        throw new Error(error as any)
    }
}

const updateBlogTagsById = async (client: SupabaseClient, postId: string, postTags: string[]) => {
    try {
        const { error } = await client.from('post_tags').delete().eq('post_id', postId)

        if (error) {
            throw new Error(error.message)
        }

        const tagArrayPromises = postTags.map((tagId) => {
            const id = `post_tag-${nanoid(5)}`
            return client.from('post_tags').insert({ id: id, post_id: postId, tag_id: tagId } as never)
        })
        await Promise.all(tagArrayPromises)
    }
    catch (error) {
        throw new Error(error as any)
    }

}
export { getBlogs, getBlogByTitle, addBlog, getAuthorBlogs, updateBlogById, deleteBlogByID, updateBlogTagsById }