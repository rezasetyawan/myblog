import { SupabaseClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

const getCategories = async (client: SupabaseClient) => {
    const { data: categories } = await useAsyncData("categories", async () => {
        const { data } = (await client.from("categories").select("id, name")) as {
            data: Array<{ id: string; name: string }>;
        };
        return data;
    });
    return categories.value
};

const addCategory = async (client: SupabaseClient, category: string) => {
    try {
        const data = { id: `category-${nanoid(5)}`, name: category }
        const { error } = await client.from('categories').insert(data)

        if (error) {
            throw new Error(error.message)
        }

    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const getCategoryById = async (client: SupabaseClient, categoryId: string) => {
    try {
        const { data, error } = await client.from('categories').select('*').eq('id', categoryId)

        if (error) {
            throw new Error(error.message)
        }

        return data[0]
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const deleteCategoryById = async (client: SupabaseClient, categoryId: string) => {
    try {
        const { error } = await client.from('categories').delete().eq('id', categoryId)

        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

const updateCategoryById = async (client: SupabaseClient, categoryId: string, category: string) => {
    try {
        const { error } = await client.from('categories').update({ name: category }).eq('id', categoryId)
        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        console.error(error)
        throw new Error(error as any)
    }
}

export { getCategories, addCategory, deleteCategoryById, getCategoryById, updateCategoryById }

