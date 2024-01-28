import { ErrorCheck } from "@/lib/error/ErrorCheck";
import { FetchError, FetchFile } from "@/types/types";


export async function getFile(id: string) : Promise<string> {
    const file = await fetch(`/api/file?id=${id}`)
        .then(async (res) => await res.json()) as FetchFile | FetchError
    if ('error' in file) {
        throw ErrorCheck(file)
    } else {
        return file.md
    }
}