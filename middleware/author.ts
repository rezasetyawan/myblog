export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    try {
        const { data: userRole, error } = await supabase.rpc('get_my_claim', { claim: 'userrole' } as unknown as undefined);

        if (error) {
            return navigateTo('/')
        }

        if (to.path === '/') {
            return navigateTo('/author/posts')
        }

        if (to.path === '/author/' || to.path === '/author') {
            return navigateTo('/author/posts')
        }

        if (!user.value || !userRole || userRole !== 'admin') {
            return navigateTo('/')
        }
        return
    } catch (error) {
        console.error(error);
    }
});