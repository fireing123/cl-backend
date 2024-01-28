
class SessionError extends Error {
    constructor(message: string) {
        super("[로그인 문제]" + message);
        this.name = this.constructor.name;
    }
}