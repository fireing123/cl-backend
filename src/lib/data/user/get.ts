import { FetchError, FetchMinUser, FetchUser, MinUser, User } from "@/types/types";
import { ErrorCheck} from "@/lib/error/ErrorCheck";

export async function getUserDetails(id: string) : Promise<User> {
    const fetchUser = await fetch(`/api/users?id=${id}&auth=true`)
        .then(async (res) => await res.json()) as FetchUser | FetchError
    if ('error' in fetchUser) {
        throw new Error(fetchUser.error)
    } else {
        const user = {
            ...fetchUser,
            type: undefined
            } as User
        return user
    }
}

export async function getUserById(id: string) : Promise<MinUser | User> {
    const fetchUser = await fetch(`/api/users?id=${id}`)
            .then(async (res) => await res.json()) as FetchMinUser | FetchError
    if ('error' in fetchUser) {
        const error = ErrorCheck(fetchUser)

        throw new error(fetchUser.error)
    } else {
        const user = {
            ...fetchUser,
            type: undefined
            } as MinUser | User
        return user
    }
}

export async function getUserByEmail(email: string) : Promise<MinUser | User> {
    const fetchUser = await fetch(`/api/users?email=${email}`)
            .then(async (res) => await res.json()) as FetchMinUser | FetchError
    if ('error' in fetchUser) {
        const error = ErrorCheck(fetchUser)

        throw new error(fetchUser.error)
    } else {
        const user = {
            ...fetchUser,
            type: undefined
            } as MinUser | User
        return user
    }
}