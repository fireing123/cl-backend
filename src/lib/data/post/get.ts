import { FetchDBPost, FetchError, FetchPostItem, Post, PostItem } from "@/types/types";
import { getFile } from "../file/get";
import { ErrorCheck } from "@/lib/error/ErrorCheck";

export async function getPostInformation(id: string) {
    const post = await fetch(`/api/post?id=${id}`)
        .then(async (res) => await res.json()) as FetchDBPost | FetchError
    if ('error' in post) {
        throw ErrorCheck(post)
    } else {
        return {
            id: post.id,
            title: post.title,
            date: post.date,
            userId: post.userId,
            fileId: post.fileId
        }
    }    
}

export async function getPost(id: string) : Promise<Post> {
    const post = await fetch(`/api/post?id=${id}`)
        .then(async (res) => await res.json()) as FetchDBPost | FetchError
    if ('error' in post) {
        throw ErrorCheck(post)
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
        throw ErrorCheck(posts)
    } else {
        return posts.posts
    }
}

export async function getPostsByUserId(userId: string) : Promise<PostItem[]> {
    const posts = await fetch(`/api/post?user=${userId}`)
        .then(async (res) => await res.json()) as FetchPostItem | FetchError
    if ('error' in posts) {
        throw ErrorCheck(posts)
    } else {
        return posts.posts
    }
}