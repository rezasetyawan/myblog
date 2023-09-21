import { SupabaseClient } from '@supabase/supabase-js';


const addImage = async (client: SupabaseClient, uniqueString: string, imageFile: File, supabaseUrl: string) => {
    try {
        const { data, error } = await client.storage.from('post-images').upload(`img-${uniqueString}`, imageFile, {
            cacheControl: '60',
            upsert: true,
        })
        if (error) {
            console.error(error)
        }
        const url = supabaseUrl + '/storage/v1/object/public/post-images/' + data?.path
        return url
    } catch (error) {
        console.error(error)
    }
}

const deleteImage = async (client: SupabaseClient, imageName: string) => {
    try {
        await client.storage.from('post-images').remove([imageName])
        return
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const updateImageById = async (client: SupabaseClient, postId: string, imageFile: File, supabaseUrl: string) => {
    try {
        const { data, error } = await client.storage.from('post-images').upload(`img-${postId}-${Date.now().toString()}`, imageFile, {
            cacheControl: '60',
            upsert: true
        })

        if (error) {
            console.error(error)
        }
        const url = supabaseUrl + '/storage/v1/object/public/post-images/' + data?.path
        return url
    } catch (error) {
        console.error(error)
    }
}


const listImages = async (client: SupabaseClient) => {
    try {
        const { data, error } = await client.storage.from('post-images').list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'asc' },
        })

        if (error) {
            console.error(error.message)
            throw new Error(error.message)
        }

        return data.map((imageData) => {
            return { ...imageData } as unknown as ImageData
        })

    } catch (error) {
        console.error(error)
    }
}

const getImages = async (client: SupabaseClient, imageData: ImageData[]): Promise<ImageData[] | undefined> => {
    try {
        const imageArrayPromise = imageData.map(async (data) => {
            const result = client.storage.from('post-images').getPublicUrl(data.name)
            const { data: post } = await client.from('posts').select('title').eq('image_url', result.data.publicUrl).limit(1).single()
            return { ...data, url: result.data.publicUrl, post: post?.title }
        })
        const data = await Promise.all(imageArrayPromise)
        return data.reverse()
    } catch (error) {
        console.error(error)
    }
}


export { addImage, updateImageById, deleteImage, getImages, listImages }