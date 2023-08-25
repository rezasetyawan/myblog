const getBlogs = async () => {
    try {
        const { data } = await useFetch('/api/blogs')
        console.log(data.value)
        return data.value?.data
    } catch (error) {
        console.error(error)
    }
}


const getBlogById = async (id: string) => {
    try {
        // const { data } = await useFetch(`/api/blogs/${id}`)
        // console.log(id)
        // console.log(data)
        // console.log(data.value?.data)
        // return data

        const { data } = await $fetch(`/api/blogs/${id}`)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}
export { getBlogs, getBlogById }