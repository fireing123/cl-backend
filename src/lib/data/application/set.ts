import { Application, Fetch, FetchError } from "@/types/types";
import { createFile } from "../file/set";
import { ErrorCheck } from "@/lib/error/ErrorCheck";

export async function createApplication({ title, email, name, phoneNumber, html } : Application) : Promise<void> {
    
    const file = await createFile(new File([html], title))

    const res = await fetch('/api/applications', {
        method: "POST",
        body: JSON.stringify({
            fileId: file.fileId,
            title: title,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            fileData: html
        })
    }).then(async (res) => await res.json()) as FetchError | Fetch
    if ('error' in res) {
        const error = ErrorCheck(res)

        throw new error(res.error)
    }
}