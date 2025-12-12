"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", message_controller_1.messageController.createMessage);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), message_controller_1.messageController.getMessages);
exports.messageRoutes = router;
//# sourceMappingURL=message.routes.js.map