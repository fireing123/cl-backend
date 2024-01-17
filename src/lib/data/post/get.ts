import { FetchDBPost, FetchError, FetchPostItem, Post, PostItem } from "@/types/types";
import { getFile } from "../file/get";

export async function getPost(id: string) : Promise<Post> {
    const post = await fetch(`/api/post?id=${id}`)
        .then(async (res) => await res.json()) as FetchDBPost | FetchError
    if ('error' in post) {
        throw new Error(post.error)
    } else {
        const file = await getFile(post.fileId)
        return {
            id: post.id,
            title: post.title,
            date: post.date,
            userId: post.userId,
            html: file
        }
    }
    
}

export async function getPostItems() : Promise<PostItem[]> {
    const posts = await fetch("/api/post")
        .then(async (res) => await res.json()) as FetchPostItem | FetchError
    if ('error' in posts) {
        throw new Error(posts.error)
    } else {
        return posts.posts
    }
}

export async function getPostsByUserId(userId: string) : Promise<PostItem[]> {
    const posts = await fetch(`/api/post?user=${userId}`)
        .then(async (res) => await res.json()) as FetchPostItem | FetchError
    if ('error' in posts) {
        throw new Error(posts.error)
    } else {
        return posts.posts
    }
}