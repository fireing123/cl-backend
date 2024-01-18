import { Application, ApplicationItem, FetchApplication, FetchApplicationItems, FetchError } from "@/types/types";
import { getFile } from "../file/get";

export async function getApplication(id : string) : Promise<Application> {
    const application = await fetch(`/api/applications/${id}`)
        .then(async (res) => await res.json()) as FetchApplication | FetchError
    if ('error' in application) {
        throw new Error(application.error)
    } else {
        const file = await getFile(application.fileId)
        return {
            id: application.id,
            title: application.title,
            email: application.email,
            date: application.date,
            name: application.name,
            phoneNumber: application.phoneNumber,
            userId: application.userId,
            html: file
        }
    }
}

export async function getApplicationItems() : Promise<ApplicationItem[]> {
    const applications = await fetch('/api/applications')
        .then(async (res) => await res.json()) as FetchApplicationItems | FetchError
    if ('error' in applications) {
        throw new Error(applications.error)
    } else {
        return applications.applications
    }
}