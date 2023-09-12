import { SupabaseClient } from '@supabase/supabase-js';
const config = useRuntimeConfig()

const addImage = async (client: SupabaseClient, postId: string, imageFile: File) => {
    try {
        console.log(imageFile)
        const { data, error } = await client.storage.from('post-images').upload(`img-${postId}`, imageFile, {
            cacheControl: '3600',
            upsert: true
        })
        if (error) {
            console.error(error)
        }
        const url = config.public.SUPABASE_URL + '/storage/v1/object/public/post-images/' + data?.path
        return url
    } catch (error) {
        throw new Error(error as any)
    }
}

export { addImage }