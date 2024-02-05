
class UndefiendError extends Error {
    constructor(message: string) {
        super("[존재하지 않는 값]" + message);
        this.name = this.constructor.name;
    }
}