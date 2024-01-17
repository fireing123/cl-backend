

class AuthorityError extends Error {
    constructor(message: string) {
        super("required authority: " + message);
        this.name = this.constructor.name;
    }
}