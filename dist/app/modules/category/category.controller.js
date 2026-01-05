"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category.service");
const createCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.categoryService.createCategory(req.body);
    (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Created category", data: result });
});
const getAllCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.categoryService.getAllCategory();
    (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Created category", data: result });
});
const getAllCategoryWithTours = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.categoryService.getAllCategoryWithTours();
    (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Created category", data: result });
});
const deleteCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.categoryService.deleteCategory(Number(req.params.id));
    (0, sendResponse_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Created category", data: result });
});
exports.categoryController = { createCategory, getAllCategory, getAllCategoryWithTours, deleteCategory };
//# sourceMappingURL=category.controller.js.map