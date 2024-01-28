import { FetchError } from "@/types/types";

export function ErrorCheck(res: FetchError) {
    if (res.type === 'session') {
        return new SessionError(res.error)
    }
    if (res.type === 'authority') {
        return new AuthorityError(res.error)
    }
    if (res.type === 'params') {
        return new ParamsError(res.error)
    }
    if (res.type === 'undefined') {
        return new ValueError(res.error)
    }
    return new Error("[알수없는 에러 에러] 메세지: " + res.error)
}