import { ErrorCheck } from "@/lib/error/ErrorCheck";
import { FetchError, File as PatchFile } from "@/types/types";

export async function patchFile({ id, file, publicAuthority } : { id: string, file: File, publicAuthority?: string} ) {
    let value: string
    if (publicAuthority) {
        value = `/api/file?id=${id}&filename=${file.name}&publicAuthority=${publicAuthority}`
    } else {
        value = `/api/file?id=${id}&filename=${file.name}`
    }

    const message = await fetch(value, { 
        method: "PATCH",
        body: file
    }).then(async (res) => await res.json()) as PatchFile | FetchError
    if ('error' in message) {
        const error = ErrorCheck(message)

        throw new error(message.error)
    } else {
        return message
    }
}