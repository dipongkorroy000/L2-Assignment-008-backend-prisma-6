"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("../../utils/jsonwebtoken");
const config_1 = __importDefault(require("../../../config"));
const ServerError_1 = __importDefault(require("../../errors/ServerError"));
const prisma_1 = require("../../shared/prisma");
const client_1 = require("@prisma/client");
const login = async (payload) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: payload.email } });
    if (!user)
        throw new ServerError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    if (user.status == client_1.UserStatus.BANNED)
        throw new ServerError_1.default(http_status_1.default.FORBIDDEN, "Banned account");
    const isCorrectPass = await bcryptjs_1.default.compare(payload.password, user.password);
    if (!isCorrectPass)
        throw new ServerError_1.default(http_status_1.default.BAD_REQUEST, "Password is incorrect");
    const accessToken = await jsonwebtoken_1.jsonwebtoken.generateToken({
        email: user.email,
        role: user.role,
        secret: config_1.default.JWT.ACCESS_TOKEN_SECRET,
        expiresIn: config_1.default.JWT.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = await jsonwebtoken_1.jsonwebtoken.generateToken({
        email: user.email,
        role: user.role,
        secret: config_1.default.JWT.REFRESH_TOKEN_SECRET,
        expiresIn: config_1.default.JWT.REFRESH_TOKEN_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
};
const getProfile = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: { email: email },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            admin: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    gender: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            guide: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    gender: true,
                    languages: true,
                    averageRating: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            tourist: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    address: true,
                    gender: true,
                    contactNumber: true,
                    languages: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
    if (user.status == client_1.UserStatus.BANNED)
        throw new ServerError_1.default(http_status_1.default.FORBIDDEN, "User is banned");
    return user;
};
const passwordUpdate = async (email, payload) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email, status: client_1.UserStatus.ACTIVE } });
    const isCorrectPass = await bcryptjs_1.default.compare(payload.oldPassword, user.password);
    if (!isCorrectPass)
        throw new ServerError_1.default(http_status_1.default.BAD_REQUEST, "Password is incorrect");
    const hashedPassword = await bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.BCRYPT_SALT_ROUND));
    const result = await prisma_1.prisma.user.update({ where: { email }, data: { password: hashedPassword } });
    return result;
};
exports.authService = { login, getProfile, passwordUpdate };
//# sourceMappingURL=auth.service.js.map