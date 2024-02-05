import { FetchError, FetchPost, Post } from "@/types/types";
import { createFile } from "../file/set";
import { ErrorCheck } from "@/lib/error/ErrorCheck";

export async function createPost({ title, html } : Post) : Promise<Post> {
    
    const file = await createFile(new File([html], title))

    const post = await fetch('/api/post', {
        method: "POST",
        body: JSON.stringify({
            fileId: file.fileId,
            title: title
        })
    }).then(async (res) => await res.json()) as FetchPost | FetchError
    if ('error' in post) {
        const error = ErrorCheck(post)

        throw new error(post.error)
    } else {
        return {
            ...post,
            type: undefined
        } as Post
    }
}