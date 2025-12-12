"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestedTourRoutes = void 0;
const express_1 = __importDefault(require("express"));
const requested_tour_controller_1 = require("./requested-tour.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.TOURIST), requested_tour_controller_1.requestedTourController.requestTour);
// requested-tours
router.get("/", (0, auth_1.default)(client_1.UserRole.TOURIST, client_1.UserRole.GUIDE), requested_tour_controller_1.requestedTourController.getRequestedTourForm);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.TOURIST, client_1.UserRole.GUIDE), requested_tour_controller_1.requestedTourController.updateRequestedTourFormStatus);
router.get("/upcoming-tours", (0, auth_1.default)(client_1.UserRole.TOURIST, client_1.UserRole.GUIDE, client_1.UserRole.ADMIN), requested_tour_controller_1.requestedTourController.upcomingTours);
router.get("/canceled-tours", (0, auth_1.default)(client_1.UserRole.TOURIST, client_1.UserRole.GUIDE), requested_tour_controller_1.requestedTourController.canceledRequestedTours);
router.get("/completed-tours", (0, auth_1.default)(client_1.UserRole.TOURIST, client_1.UserRole.GUIDE, client_1.UserRole.ADMIN), requested_tour_controller_1.requestedTourController.completedRequestedTours);
router.get("/completed-review-tours", (0, auth_1.default)(client_1.UserRole.TOURIST), requested_tour_controller_1.requestedTourController.completedToursReviewProvide);
exports.requestedTourRoutes = router;
//# sourceMappingURL=requested-tour.routes.js.map