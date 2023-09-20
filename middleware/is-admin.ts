export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const userRole = await getUserRole('userrole')
        if (userRole === 'admin') {
            console.log('admin')
            return navigateTo('/author/')
        }
        console.log('not admin')
        return
    } catch (error) {
        throw new Error(error as any);
    }
});

const getUserRole = async (claim: string) => {
    const supabase = useSupabaseClient();
    try {
        const { data, error } = await supabase.rpc('get_my_claim', { claim } as unknown as undefined);

        if (error) {
            throw new Error(error.message);
        }

        if (data) {
            return data;
        }
    } catch (error) {
        throw new Error(error as any);
    }
}

