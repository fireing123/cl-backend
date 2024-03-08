import { FetchApplication, FetchError } from "@/types/types"
import { patchFile } from "../file/patch"
import {getApplicationInfo } from "./get"
import { ErrorCheck } from "@/lib/error/ErrorCheck"


export async function patchApplication(id: string, title?: string, email?: string, name?: string, phoneNumber?: string, file?: File) {
    const info = await getApplicationInfo(id)
    let reqeustMessage = `/api/applications?id=${id}`
    if (title) reqeustMessage += `&title=${title}`
    if (email) reqeustMessage += `&email=${email}`
    if (name) reqeustMessage += `&name=${name}`
    if (phoneNumber) reqeustMessage += `&phoneNumber=${phoneNumber}`

    if (file) {
        await patchFile({
            id: info.fileId,
            file: file
        })
    }

    const patch = await fetch(reqeustMessage, { method: "PATCH" })
        .then(async (res) => await res.json()) as FetchApplication | FetchError
    if ('error' in patch) {
        const error = ErrorCheck(patch)

        throw new error(patch.error)
    } else {
        return patch
    }
}