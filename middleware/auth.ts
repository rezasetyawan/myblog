export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    try {
        const { data: userRole, error } = await supabase.rpc('get_my_claim', { claim: 'userrole' } as unknown as undefined);

        if (error) {
            console.error(error)
            return navigateTo('/')
        }

        if (!user.value || !userRole || userRole !== 'admin') {
            console.log('not admin')
            return navigateTo('/')
        }

        return
    } catch (error) {
        console.error(error);
    }
});

// async function getUserRole(claim: string) {
//     const supabase = useSupabaseClient();
//     try {
//         const { data, error } = await supabase.rpc('get_my_claim', { claim } as unknown as undefined);

//         if (error) {
//             throw new Error(error.message);
//         }

//         if (data) {
//             return data;
//         }
//     } catch (error) {
//         throw new Error(error as any);
//     }
// }
