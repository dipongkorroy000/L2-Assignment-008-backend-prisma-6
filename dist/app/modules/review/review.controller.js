"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const review_service_1 = require("./review.service");
const getReviews = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.token;
    const result = await review_service_1.reviewsService.getReviews(email);
    (0, sendResponse_1.default)(res, { status: 200, success: true, message: "Reviews retrieved successfully", data: result });
});
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const result = await review_service_1.reviewsService.createReview(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, { status: 200, success: true, message: "Reviews retrieved successfully", data: result });
});
exports.reviewsController = { getReviews, createReview };
//# sourceMappingURL=review.controller.js.map