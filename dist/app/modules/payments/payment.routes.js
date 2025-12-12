"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/:id", (0, auth_1.default)(client_1.UserRole.TOURIST), payment_controller_1.PaymentController.paymentInit);
router.get("/", (0, auth_1.default)(client_1.UserRole.TOURIST, client_1.UserRole.GUIDE, client_1.UserRole.ADMIN), payment_controller_1.PaymentController.getPayments);
exports.paymentRoutes = router;
//# sourceMappingURL=payment.routes.js.map