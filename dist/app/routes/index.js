"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/users/user.routes");
const stats_routes_1 = require("../modules/stats/stats.routes");
const review_routes_1 = require("../modules/review/review.routes");
const tour_routes_1 = require("../modules/tours/tour.routes");
const category_routes_1 = require("../modules/category/category.routes");
const payment_routes_1 = require("../modules/payments/payment.routes");
const requested_tour_routes_1 = require("../modules/requested-tour/requested-tour.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/auth", route: auth_routes_1.authRoutes },
    { path: "/user", route: user_routes_1.userRoutes },
    { path: "/tours", route: tour_routes_1.tourRoutes },
    { path: "/category", route: category_routes_1.categoryRoutes },
    { path: "/payment", route: payment_routes_1.paymentRoutes },
    { path: "/request-tour", route: requested_tour_routes_1.requestedTourRoutes },
    { path: "/stats", route: stats_routes_1.statsRoutes },
    { path: "/review", route: review_routes_1.reviewsRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map