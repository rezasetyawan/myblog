import { SupabaseClient } from '@supabase/supabase-js';

const getTags = async (client: SupabaseClient) => {
    const { data: tags } = await useAsyncData("categories", async () => {
        const { data } = (await client.from("tags").select("id, name")) as {
            data: Array<{ id: string; name: string }>;
        };
        return data;
    });
    return tags.value;
};


export { getTags }