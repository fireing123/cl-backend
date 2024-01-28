import { FetchError, FetchUser, Rank, User } from "@/types/types";


export async function patchUser({ id, rank, phoneNumber }: { id: string, rank?: Rank, phoneNumber: string }) {
    let reqeustMessage = `/api/users?id=${id}`

    if (rank) reqeustMessage += `&rank=${rank}`
    if (phoneNumber) reqeustMessage += `&phoneNumber=${phoneNumber}`

    const patch = await fetch(reqeustMessage, { method: "PATCH" })
        .then(async (res) => await res.json()) as FetchUser | FetchError
    if ('error' in patch) {
        throw new Error(patch.error)
    } else {
        return {
            ...patch,
            type: undefined
        } as User
    }
}