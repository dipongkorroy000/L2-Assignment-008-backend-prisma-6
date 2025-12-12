"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/guide", (0, auth_1.default)(client_1.UserRole.GUIDE), review_controller_1.reviewsController.getReviews);
router.patch("/tourist-create-review/:id", (0, auth_1.default)(client_1.UserRole.TOURIST), review_controller_1.reviewsController.createReview);
exports.reviewsRoutes = router;
//# sourceMappingURL=review.routes.js.map