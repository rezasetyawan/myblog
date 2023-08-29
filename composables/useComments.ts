const addComment = async (commentDraf: CommentDraf) => {
    try {
        console.log('runned')
        await $fetch('/api/comments', { method: 'POST', body: commentDraf })

    }
    catch (error) {
        console.log('use')
        console.error()
    }
}


const getComments = async (postId: string) => {
    try {
        const { data } = await useFetch(`/api/comments/${postId}`, {
            key:`comments-${postId}`
        })
        return data.value
    } catch (error) {
        console.error(error)
    }
}

// const deleteCommentById = async (commentId) => {
//     try{} catch(error) {}
// }

export { addComment, getComments }