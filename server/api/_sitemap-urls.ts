export default defineEventHandler(async () => {
    const [data] = await Promise.all([$fetch('/api/blogsitemap')])
    return data.map((p) => {
        return { loc: p.url, lastmod: p.updated_at }
    })
})