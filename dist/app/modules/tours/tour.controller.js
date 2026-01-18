"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const tour_service_1 = require("./tour.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const formateObject_1 = __importDefault(require("../../middlewares/formateObject"));
const createTour = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await tour_service_1.tourService.createTour(req.params.email, req.body, req.file);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tour Created Successfully", data: result });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const getAllTours = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, formateObject_1.default)(req.query, ["city", "duration", "categoryId", "searchTerm", "price"]);
    const options = (0, formateObject_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    try {
        const result = await tour_service_1.tourService.getAllTours(filters, options);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tours Retrieved Successfully", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
const getTourById = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await tour_service_1.tourService.getTourById(Number(req.params.id));
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tour Retrieved Successfully", data: result });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const getToursByGuide = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, formateObject_1.default)(req.query, ["city", "duration", "category", "searchTerm"]);
    const options = (0, formateObject_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    try {
        const result = await tour_service_1.tourService.getToursByGuide(filters, options, req.token?.email);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tours Retrieved Successfully", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
const updateTourByGuide = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.token;
    try {
        const result = await tour_service_1.tourService.updateTourByGuide(email, Number(req.params.id), req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tour Updated Successfully", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
const updateTourStatusByGuide = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.token;
    try {
        const result = await tour_service_1.tourService.updateTourStatusByGuide(email, Number(req.params.id));
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tour Status Updated Successfully", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteTour = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.token;
    try {
        const result = await tour_service_1.tourService.deleteTour(email, Number(req.params.id));
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Tour Deleted Successfully", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
const getAISuggestions = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const result = await tour_service_1.tourService.getAISuggestions(req.body);
        (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "AI Suggestions Retrieved Successfully", data: result });
    }
    catch (error) {
        console.log(error);
    }
});
exports.tourController = {
    createTour,
    getAllTours,
    getTourById,
    getToursByGuide,
    updateTourByGuide,
    updateTourStatusByGuide,
    deleteTour,
    getAISuggestions,
};
//# sourceMappingURL=tour.controller.js.map