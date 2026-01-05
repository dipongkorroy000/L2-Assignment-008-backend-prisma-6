"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", category_controller_1.categoryController.createCategory);
router.get("/", category_controller_1.categoryController.getAllCategory);
router.get("/tours", category_controller_1.categoryController.getAllCategoryWithTours);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.categoryController.deleteCategory);
exports.categoryRoutes = router;
//# sourceMappingURL=category.routes.js.map