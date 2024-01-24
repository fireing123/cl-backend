import { FetchApplication, FetchError } from "@/types/types"
import { patchFile } from "../file/patch"
import { getApplicationInfo } from "./get"


export async function patchApplication(id: string, title: string | undefined, email: string | undefined, name: string | undefined, phoneNumber: string | undefined, file: File | undefined) {
    const info = await getApplicationInfo(id)
    let reqeustMessage = `/api/applications?${id}`

    if (title) reqeustMessage += `&title=${title}`
    if (email) reqeustMessage += `&email=${email}`
    if (name) reqeustMessage += `&name=${name}`
    if (phoneNumber) reqeustMessage += `&phoneNumber=${phoneNumber}`

    if (file) {
        await patchFile({
            id: info.fileId,
            file: file,
            publicAuthority: undefined
        })
    }

    const patch = await fetch(reqeustMessage, { method: "PATCH" })
        .then(async (res) => await res.json()) as FetchApplication | FetchError
    if ('error' in patch) {
        throw new Error(patch.error)
    } else {
        return patch
    }

}