"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    status;
    constructor(status, message, stack) {
        super(message);
        this.name = "ServerError"; // ✅ clearer error type
        this.status = status;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ServerError;
//# sourceMappingURL=ServerError.js.map