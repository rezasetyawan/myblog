import useLayout from "~/stores/useLayout";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {layout, setLayout} = useLayout()
    try {
        const userRole = await getUserRole('userrole')
        if (userRole === 'admin') {
            setLayout('author-layout')
            await nextTick()
            return navigateTo('/author/posts')
        }

        if (to.path ===  '/auth/login') {
            setLayout('default-layout')
            await nextTick()
            return
        }

        setLayout('my-layout')
        await nextTick()
        return
    } catch (error) {
        throw new Error(error as any);
    }
});

const getUserRole = async (claim: string) => {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient();
    try {
        if (user) {
            const { data, error } = await supabase.rpc('get_my_claim', { claim } as unknown as undefined);

            if (error) {
                throw new Error(error.message);
            }

            if (data) {
                return data;
            }
        }
    } catch (error) {
        throw new Error(error as any);
    }
}

