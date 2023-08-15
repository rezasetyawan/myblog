const getBlogs = async () => {
    try {
        const { posts } = await $fetch('/api/blogs')
        console.log(posts)
        return posts
    } catch (error) {
        console.error(error)
    }
}


const getBlogById = async (id: string) => {
    try {
        const { post } = await $fetch(`/api/blogs/${id}`)
        return post
    } catch (error) {
        console.error(error)
    }
}
export { getBlogs, getBlogById }