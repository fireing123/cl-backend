import { ErrorCheck } from "@/lib/error/ErrorCheck"
import { FetchError, File } from "@/types/types"

export async function deleteFile(id: string) : Promise<File> {
    const file = await fetch(`/api/file?id=${id}`, { method: "DELETE" })
        .then(async (res) => await res.json()) as File | FetchError
    if ('error' in file) {
        const error = ErrorCheck(file)

        throw new error(file.error)
    } else {
        return file
    }
}