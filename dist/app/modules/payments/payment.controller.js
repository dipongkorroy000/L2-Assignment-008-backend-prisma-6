"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const paymentInit = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.paymentInit(Number(req.params.id));
    (0, sendResponse_1.default)(res, { status: 201, success: true, message: "Payment paid successfully!", data: result });
});
const getPayments = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.token;
    const result = await payment_service_1.PaymentService.getPayments(email);
    (0, sendResponse_1.default)(res, { status: 201, success: true, message: "Payment retrieved successfully!", data: result });
});
const getPayment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.getPayment(req.params.transactionId);
    (0, sendResponse_1.default)(res, { status: 201, success: true, message: "Payment retrieved successfully!", data: result });
});
exports.PaymentController = { paymentInit, getPayments, getPayment };
//# sourceMappingURL=payment.controller.js.map