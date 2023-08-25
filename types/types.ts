declare interface GetBlog {
    id: string
    title: string
    created_at: string
    comment_counts: number
    image_url: string
}

declare interface GetBlogDetail {
    id: string
    title: string
    text: string
    image_url: string
    created_at: string
    comments: {count : number}[]
    category: string
    tags: {id: string, name: string}[]
}

declare interface GetComment {
    id: string
    user_id: string
    text: string
    time: string
}

declare interface BlogSnapshots {
    data: GetBlog[] | []
}


declare interface BlogSnapshot {
    data: GetBlogDetail | {}
}

declare interface CommentDraf {
    parent_id: any;
    name?: string;
    email?: string;
    text: string;
    post_id: string
}

declare interface PostComment{
    id: string;
    text: string;
    user_id: string;
    post_id: string;
    time: string;
    parent_id: string;
}