const addComment = async (commentDraf: {}) => {
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
        console.log('get comments')
        const comments = await $fetch(`/api/comments/${postId}`)
        return {
            ...comments
        }
    } catch (error) {
        console.error(error)
    }
}

// const deleteCommentById = async (commentId) => {
//     try{} catch(error) {}
// }

export { addComment, getComments }