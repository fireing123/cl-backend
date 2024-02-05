import { FetchError } from "@/types/types";

export function ErrorCheck(res: FetchError) {
    if (res.type === 'session') {
        return SessionError
    } else
    if (res.type === 'authority') {
        return AuthorityError
    } else
    if (res.type === 'params') {
        return ParamsError
    } else
    if (res.type === 'undefined') {
        return UndefiendError
    }
    return Error
}