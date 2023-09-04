const addComment = async (commentDraf: CommentDraf) => {
    try {
        await $fetch('/api/comments', { method: 'POST', body: commentDraf })
    }
    catch (error) {
        console.error(error)
    }
}


const getComments = async (postId: string) => {
    try {
        const { data } = await useFetch(`/api/comments/${postId}`, {
            key: `comments-${postId}`
        })
        return data.value as CommentSnapshots
    } catch (error) {
        console.error(error)
    }
}

export { addComment, getComments }