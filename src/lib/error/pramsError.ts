
class ParamsError extends Error {
    constructor(message: string) {
        super("[파라미터 결핍]" + message);
        this.name = this.constructor.name;
    }
}