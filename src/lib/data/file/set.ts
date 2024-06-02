import { ErrorCheck } from "@/lib/error/ErrorCheck";
import { FetchError, File as CreateFile } from "@/types/types";

export async function createFile(file: File) : Promise<CreateFile> {
    const res = await fetch(`/api/file?filename=${file.name}`, {
        method: "POST",
        body: file
    }).then(async (res) => await res.json()) as CreateFile | FetchError
    if ('error' in res) {
        const error = ErrorCheck(res)

        throw new error(res.error)
    } else {
        return res
    }

}