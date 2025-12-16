"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const stripe_controller_1 = require("./app/modules/stripe/stripe.controller");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
// this webhook call(stripe call this api) -> when tourist can book then call this webhook for payment
app.post("/webhook", express_1.default.raw({ type: "application/json" }), stripe_controller_1.StripeController.handleStripeWebhookEvent);
app.use((0, cors_1.default)({ origin: config_1.default.FRONTEND_URL, credentials: true }));
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map