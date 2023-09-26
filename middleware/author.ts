import useLayout from "~/stores/useLayout";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { layout, setLayout } = useLayout()
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    console.log('author middleware')

    try {
        const { data: userRole, error } = await supabase.rpc('get_my_claim', { claim: 'userrole' } as unknown as undefined);

        if (error) {
            setLayout('my-layout')
            await nextTick(); 
            console.log(layout.value)
            return navigateTo('/')
        }

        if (to.path === '/') {
            console.log(layout.value)
            return navigateTo('/author/posts')
        }

        if (to.path === '/author/' || to.path === '/author') {
            setLayout('author-layout')
            await nextTick(); 
            console.log(layout.value)
            return navigateTo('/author/posts')
        }

        if (!user.value || !userRole || userRole !== 'admin') {
            setLayout('my-layout')
            await nextTick(); 
            console.log(layout.value)
            return navigateTo('/')
        }
        setLayout('author-layout')
        return
    } catch (error) {
        console.error(error);
    }
});