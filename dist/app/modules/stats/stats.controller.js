"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const stats_service_1 = require("./stats.service");
const adminStats = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await stats_service_1.statsService.adminStats(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Stats retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const guideStats = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await stats_service_1.statsService.guideStats(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Stats retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const toursStatsForChart = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await stats_service_1.statsService.toursStatsForChart();
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Stats retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.statsController = { adminStats, guideStats, toursStatsForChart };
//# sourceMappingURL=stats.controller.js.map