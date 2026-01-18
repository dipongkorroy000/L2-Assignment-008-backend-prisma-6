"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../../config"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const tokenMaxAge_1 = __importDefault(require("../../utils/tokenMaxAge"));
const http_status_1 = __importDefault(require("http-status"));
const login = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.login(req.body);
        const { accessToken, refreshToken } = result;
        const accessTokenExpiresIn = config_1.default.JWT.ACCESS_TOKEN_EXPIRES_IN;
        const refreshTokenExpiresIn = config_1.default.JWT.REFRESH_TOKEN_EXPIRES_IN;
        const tokenAge = (0, tokenMaxAge_1.default)({ accessTokenExpiresIn, refreshTokenExpiresIn });
        res.cookie("accessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", maxAge: tokenAge.accessTokenMaxAge });
        res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "none", maxAge: tokenAge.refreshTokenMaxAge });
        (0, sendResponse_1.default)(res, { status: 200, success: true, message: "Login Successfully", data: null });
    }
    catch (error) {
        next(error);
    }
});
const getProfile = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.token?.email;
    const result = await auth_service_1.authService.getProfile(email);
    (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "User retrieve successfully!", data: result });
});
const passwordUpdate = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.authService.passwordUpdate(req.token?.email, req.body);
    (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "User retrieve successfully!", data: result });
});
exports.authController = { login, getProfile, passwordUpdate };
//# sourceMappingURL=auth.controller.js.map