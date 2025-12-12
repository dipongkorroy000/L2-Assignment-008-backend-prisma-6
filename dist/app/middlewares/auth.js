"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ServerError_1 = __importDefault(require("../errors/ServerError"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken || req.headers.accessToken;
            if (!accessToken)
                throw new ServerError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            const token = jsonwebtoken_1.jsonwebtoken.verifyToken(accessToken, config_1.default.JWT.ACCESS_TOKEN_SECRET);
            req.token = token;
            if (roles.length && !roles.includes(token.role))
                throw new ServerError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized user!");
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = auth;
//# sourceMappingURL=auth.js.map