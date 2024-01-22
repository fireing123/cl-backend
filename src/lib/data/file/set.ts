import { File as createFile } from "@/types/types";

export async function createFile(file: File) : Promise<createFile> {
    return await fetch(`/api/file?filename=${file.name}`, {
        method: "POST",
        body: file
    }).then(async (res) => await res.json()) as createFile
}