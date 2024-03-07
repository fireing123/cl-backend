import { FetchError, FetchUser, Rank, User } from "@/types/types";


export async function patchUser({ id, rank, username, phoneNumber }: { id: string, rank?: Rank, username?: string, phoneNumber?: string }) {

    const patch = await fetch("/api/users", {
         method: "PATCH",
        body: JSON.stringify({
            id, rank, username, phoneNumber
        })
        })
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