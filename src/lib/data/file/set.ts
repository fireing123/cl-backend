import { CreateFile } from "@/types/types";

export async function createFile(file: File) : Promise<CreateFile> {
    return await fetch(`/api/file?filename=${file.name}`, {
        method: "POST",
        body: file
    }).then(async (res) => await res.json()) as CreateFile
}