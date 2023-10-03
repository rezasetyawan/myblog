import { SupabaseClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

const getTags = async (client: SupabaseClient) => {
    const { data: tags } = await useAsyncData("categories", async () => {
        const { data } = (await client.from("tags").select("id, name")) as {
            data: Array<{ id: string; name: string }>;
        };
        return data;
    });
    return tags.value;
};

const addTag = async (client: SupabaseClient, tag: string) => {
    try {
        const data = { id: `tag-${nanoid(5)}`, name: tag }
        const { error } = await client.from('tags').insert(data)

        if (error) {
            throw new Error(error.message)
        }

    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const getTagById = async (client: SupabaseClient, tagId: string) => {
    try {
        const { data, error } = await client.from('tags').select('*').eq('id', tagId)

        if (error) {
            throw new Error(error.message)
        }

        return data[0]
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const deleteTagById = async (client: SupabaseClient, tagId: string) => {
    try {
        const { error } = await client.from('tags').delete().eq('id', tagId)

        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const updateTagById = async (client: SupabaseClient, tagId: string, tag: string) => {
    try {
        const { error } = await client.from('tags').update({ name: tag }).eq('id', tagId)

        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

export { getTags, addTag, getTagById, deleteTagById, updateTagById }