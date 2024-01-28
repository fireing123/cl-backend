import { FetchApplication, FetchError } from "@/types/types";
import { deleteFile } from "../file/del";
import { ErrorCheck } from "@/lib/error/ErrorCheck";

export async function deleteApplication(id: string) : Promise<FetchApplication> {
    const message = await fetch(`/api/applications/${id}`, { method: "DELETE" })
        .then(async (res) => await res.json()) as FetchApplication | FetchError
    if ('error' in message) {
        throw ErrorCheck(message)
    } else {
        try {
            await deleteFile(message.fileId)
            return message
        } catch (error) {
            return message
        }
    }
    
}