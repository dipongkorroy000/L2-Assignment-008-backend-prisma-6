"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const formateObject_1 = __importDefault(require("../../middlewares/formateObject"));
const http_status_1 = __importDefault(require("http-status"));
const createTourist = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await user_service_1.userService.createTourist(req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.CREATED, success: true, message: "Profile created successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const createGuide = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await user_service_1.userService.createGuide(req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.CREATED, success: true, message: "Profile created successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const createAdmin = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await user_service_1.userService.createAdmin(req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.CREATED, success: true, message: "Profile created successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const getAllUsers = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    const filters = (0, formateObject_1.default)(req.query, ["status", "role", "email", "searchTerm"]);
    const options = (0, formateObject_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    try {
        const result = await user_service_1.userService.getAllUsers(email, filters, options);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Users retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const updateProfile = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await user_service_1.userService.updateProfile(req.token, req.body, req.file);
        (0, sendResponse_1.default)(res, {
            status: http_status_1.default.OK,
            success: true,
            message: "Profile updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProfileStatus = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await user_service_1.userService.updateProfileStatus(Number(id), req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Users profile status changed!", data: result });
    }
    catch (error) {
        next(error);
    }
});
const getUser = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await user_service_1.userService.getUser(Number(req.params.id));
        console.log(result);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "User retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = { createTourist, createGuide, createAdmin, getAllUsers, updateProfile, updateProfileStatus, getUser };
//# sourceMappingURL=user.controller.js.map