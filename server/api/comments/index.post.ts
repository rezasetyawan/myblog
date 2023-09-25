import { serverSupabaseClient } from '#supabase/server'
import { nanoid } from 'nanoid'

interface ReqBody {
    uuid?: string
    parent_id: string
    name: string
    email: string
    text: string
    post_id: string

}

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    try {
        const { uuid, parent_id, name, email, text, post_id }: ReqBody = await readBody(event)
        const { data: users } = await client.from("public_users").select("id, name").eq("email", email)
        let userID: string

        if (!users?.length) {
            userID = uuid ? uuid : nanoid(16)
            const userData = { id: userID, email: email, name: name }
            const commentData: PostComment = { id: nanoid(16), text: text, user_id: userID, post_id: post_id, time: Date.now().toString(), parent_id: parent_id }

            await client.from('public_users').insert(userData as never)
            await client.from('comments').insert(commentData as never)
        } else {
            userID = users[0].id
            if (users[0].name !== name) {
                await client.from('public_users').update({ name: name } as never).eq('id', userID)
            }
            const commentData: PostComment = { id: nanoid(16), text: text, user_id: userID, post_id: post_id, time: Date.now().toString(), parent_id: parent_id }
            await client.from('comments').insert(commentData as never)
        }
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
})