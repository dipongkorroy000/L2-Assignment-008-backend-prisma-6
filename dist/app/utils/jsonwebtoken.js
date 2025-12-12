"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonwebtoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async ({ email, role, secret, expiresIn }) => {
    return jsonwebtoken_1.default.sign({ email: email, role: role }, secret, { algorithm: "HS256", expiresIn: expiresIn });
};
const verifyToken = (token, secret) => jsonwebtoken_1.default.verify(token, secret);
exports.jsonwebtoken = { generateToken, verifyToken };
//# sourceMappingURL=jsonwebtoken.js.map