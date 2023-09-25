import { SupabaseClient } from '@supabase/supabase-js';

const getCategories = async (client: SupabaseClient) => {
    const { data: categories } = await useAsyncData("categories", async () => {
        const { data } = (await client.from("categories").select("id, name")) as {
            data: Array<{ id: string; name: string }>;
        };
        return data;
    });
    return categories.value
};

export { getCategories }

