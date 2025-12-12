"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const message_service_1 = require("./message.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const createMessage = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await message_service_1.messageService.createMessage(req.body);
        (0, sendResponse_1.default)(res, { status: 201, success: true, message: "Message create successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const getMessages = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await message_service_1.messageService.getMessages();
        (0, sendResponse_1.default)(res, { status: 201, success: true, message: "Message create successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.messageController = { createMessage, getMessages };
//# sourceMappingURL=message.controller.js.map