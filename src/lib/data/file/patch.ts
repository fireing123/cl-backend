import { ErrorCheck } from "@/lib/error/ErrorCheck";
import { FetchError, File as patchFile } from "@/types/types";

export async function patchFile({ id, file, publicAuthority } : { id: string, file: File, publicAuthority?: string} ) {
    let value: string
    if (publicAuthority) {
        value = `/api/file?=${id}&publicAuthority=${publicAuthority}`
    } else {
        value = `/api/file?=${id}`
    }
    const message = await fetch(value, { method: "PATCH" }).then(async (res) => await res.json()) as patchFile | FetchError
    if ('error' in message) {
        const error = ErrorCheck(message)

        throw new error(message.error)
    } else {
        return message
    }
}