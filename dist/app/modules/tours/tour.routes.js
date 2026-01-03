"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tour_controller_1 = require("./tour.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const imageFileUploader_1 = require("../../utils/imageFileUploader");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/ai-suggestions", tour_controller_1.tourController.getAISuggestions);
router.post("/:email", imageFileUploader_1.imageFileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return tour_controller_1.tourController.createTour(req, res, next);
});
router.get("/", tour_controller_1.tourController.getAllTours);
router.get("/guide", (0, auth_1.default)(client_1.UserRole.GUIDE), tour_controller_1.tourController.getToursByGuide);
router.get("/:id", tour_controller_1.tourController.getTourById);
router.put("/:id", (0, auth_1.default)(client_1.UserRole.GUIDE), tour_controller_1.tourController.updateTourByGuide);
router.put("/:id/status", (0, auth_1.default)(client_1.UserRole.GUIDE), tour_controller_1.tourController.updateTourStatusByGuide);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.GUIDE, client_1.UserRole.ADMIN), tour_controller_1.tourController.deleteTour);
exports.tourRoutes = router;
//# sourceMappingURL=tour.routes.js.map