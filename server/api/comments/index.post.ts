import { serverSupabaseClient } from '#supabase/server'
import { nanoid } from 'nanoid'

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    try {
        const { name, email, text, blogId } = await readBody(event)
        const userId = nanoid(16)

        const { data: users } = await client.from("public_users").select("id").eq("email", email)
        console.log(users[0])
        let userID

        if (!users?.length) {
            userID = nanoid(16)
            const userData = { id: userID, email: email, name: name }
            await client.from('public_users').insert(userData)
            const commentData = { id: nanoid(16), text: text, user_id: userID, post_id: blogId, time: Date.now().toString() }
            await client.from('comments').insert(commentData as never)
        } else {
            userID = users[0].id
            const commentData = { id: nanoid(16), text: text, user_id: userID, post_id: blogId, time: Date.now().toString() }
            await client.from('comments').insert(commentData as never)
        }


    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
})