import { FetchError } from "@/types/types";

export class UndefiendError extends Error {
    constructor(message: string) {
        super("[존재하지 않는 값]" + message);
        this.name = this.constructor.name;
    }
}


export class ParamsError extends Error {
    constructor(message: string) {
        super("[파라미터 결핍]" + message);
        this.name = this.constructor.name;
    }
}


export class AuthorityError extends Error {
    constructor(message: string) {
        super("required authority: " + message);
        this.name = this.constructor.name;
    }
}

export class SessionError extends Error {
    constructor(message: string) {
        super("[로그인 문제]" + message);
        this.name = this.constructor.name;
    }
}

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


