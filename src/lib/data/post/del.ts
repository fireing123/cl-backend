import { DBPost, FetchDBPost, FetchError } from "@/types/types"
import { deleteFile } from "../file/del"

export async function deletePost(id: string) : Promise<DBPost>{
    const message = await fetch(`/api/post?id=${id}`, { method: "DELETE" })
        .then(async (res) => await res.json()) as FetchDBPost | FetchError
    if ('error' in message) {
        throw new Error(message.error)
    } else {
        try {
            await deleteFile(message.fileId)
            return {
                ...message,
                type: undefined
            } as DBPost
        } catch (error) {
            return {
                ...message,
                type: undefined
            } as DBPost
        }
    }
}