"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestedTourController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const requested_tour_service_1 = require("./requested-tour.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const requestTour = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const token = req.token;
        const result = await requested_tour_service_1.requestedTourService.requestTour(token.email, req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tours Requested Successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const getRequestedTourForm = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await requested_tour_service_1.requestedTourService.getRequestedTourForm(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "ToursForm retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const updateRequestedTourFormStatus = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await requested_tour_service_1.requestedTourService.updateRequestedTourFormStatus(email, Number(req.params.id), req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "ToursForm updated successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const upcomingTours = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await requested_tour_service_1.requestedTourService.upcomingTours(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Upcoming tours retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const canceledRequestedTours = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await requested_tour_service_1.requestedTourService.canceledRequestedTours(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "ToursForm retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const completedRequestedTours = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await requested_tour_service_1.requestedTourService.completedRequestedTours(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "ToursForm retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
const completedToursReviewProvide = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email } = req.token;
    try {
        const result = await requested_tour_service_1.requestedTourService.completedToursReviewProvide(email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "ToursForm retrieved successfully", data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.requestedTourController = {
    requestTour,
    getRequestedTourForm,
    updateRequestedTourFormStatus,
    upcomingTours,
    canceledRequestedTours,
    completedRequestedTours,
    completedToursReviewProvide
};
//# sourceMappingURL=requested-tour.controller.js.map