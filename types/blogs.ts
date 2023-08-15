declare interface GetBlog {
    title: string
    created_at: string
}

declare interface BlogSnapshots {
    posts: GetBlog[] | []
}

declare interface BlogSnapshot {
    post: GetBlog | {}
}