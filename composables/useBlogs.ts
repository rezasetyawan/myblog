const getBlogs = async (search_key: string = "", category_id: string = "") => {
    try {
        const result = await useFetch('/api/blogs', {
            query: {
                search_key: search_key,
                category_id: category_id
            },
            key: 'blogSnapshots'
        })
        
        return result.data.value?.data
    } catch (error) {
        console.error(error)
    }
}


const getBlogById = async (id: string) => {
    try {
        const { data } = await useFetch(`/api/blogs/${id}`, {
            key:`${id}`
        })
        console.log(data.value?.data)
        return data.value?.data

        // const { data } = await $fetch(`/api/blogs/${id}`)
        // console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}
export { getBlogs, getBlogById }