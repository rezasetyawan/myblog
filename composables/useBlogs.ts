const getBlogs = async (search_key: string = "", category_id: string = "", tags: string[] = [], page: number = 1, cacheKey: string = "blogs") => {
    try {
        const { data } = await useFetch('/api/blogs', {
            query: {
                search_key: search_key,
                category_id: category_id,
                tags: tags,
                page: page
            },
            key: cacheKey,
        })
        return data.value
    } catch (error) {
        console.error(error)
    }
}


const getBlogById = async (id: string) => {
    try {
        const { data } = await useFetch(`/api/blogs/${id}`, {
            key: `${id}`
        })
        return data.value?.data
    } catch (error) {
        console.error(error)
    }
}
export { getBlogs, getBlogById }