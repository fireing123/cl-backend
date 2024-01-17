import { Application, ApplicationItem, FetchApplication, FetchApplicationItems, FetchError } from "@/types/types";

export async function getApplication(id : string) {
    const application = await fetch(`/api/applications/${id}`)
        .then(async (res) => await res.json()) as FetchApplication | FetchError
    if ('error' in application) {
        throw new Error(application.error)
    } else {
        const app = {
            ...application,
            type: undefined
        } as Application
        return app
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