"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const stats_controller_1 = require("./stats.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/admin", (0, auth_1.default)(client_1.UserRole.ADMIN), stats_controller_1.statsController.adminStats);
router.get("/guide", (0, auth_1.default)(client_1.UserRole.GUIDE), stats_controller_1.statsController.guideStats);
router.get("/chart", stats_controller_1.statsController.toursStatsForChart);
exports.statsRoutes = router;
//# sourceMappingURL=stats.routes.js.map