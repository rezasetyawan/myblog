import useLayout from "~/stores/useLayout";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { layout, setLayout } = useLayout()
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    try {
        const { data: userRole, error } = await supabase.rpc('get_my_claim', { claim: 'userrole' } as unknown as undefined);

        if (error) {
            return navigateTo('/')
        }

        if (to.path === '/author/' || to.path === '/author' || to.path === '/author/') {
            setLayout('author-layout')
            return navigateTo('/author/posts')
        }

        if (!user.value || !userRole || userRole !== 'admin') {
            return navigateTo('/')
        }

        setLayout('author-layout')
        await nextTick()
        return
    } catch (error) {
        console.error(error);
    }
});