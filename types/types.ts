declare interface GetBlog {
    id: string
    title: string
    created_at: string
    comments: {count: number}[]
    image_url: string

}

declare interface GetBlogDetail {
    id: string
    title: string
    text: string
    image_url: string
    created_at: string
    updated_at?: string
    comments: GetComment[]
}

declare interface GetComment {
    id: string
    user_id: string
    text: string
    time: string
}

declare interface BlogSnapshots {
    posts: GetBlog[] | []
}


declare interface BlogSnapshot {
    post: GetBlogDetail | {}
}