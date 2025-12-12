declare class ServerError extends Error {
    status: number;
    constructor(status: number, message: string, stack?: string);
}
export default ServerError;
//# sourceMappingURL=ServerError.d.ts.map