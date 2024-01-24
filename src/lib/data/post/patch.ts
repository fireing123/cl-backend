import { FetchDBPost } from "@/types/types"
import { patchFile } from "../file/patch"
import { getPost, getPostInformation } from "./get"


export async function patchPost(id: string, title: string | undefined, file: File | undefined, publicAuthority: string | undefined) {
    const information = await getPostInformation(id)
    
    if (title) {
        const post = await fetch(`/api/post?id=${id}&title=${title}`, { method: "PATCH" })
            .then(async (res) => await res.json()) as FetchDBPost
    }
    if (file) {
        await patchFile({
            id: information.fileId,
            file: file,
            publicAuthority: publicAuthority
        })
    }
    if (!(title && file)) {
        throw new Error('title, file 인수 둘중하나는 주여저야 합니다')
    }
}