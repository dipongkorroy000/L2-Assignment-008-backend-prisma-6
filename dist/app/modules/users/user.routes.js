"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const imageFileUploader_1 = require("../../utils/imageFileUploader");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.getAllUsers);
router.get("/guides-languages", user_controller_1.userController.guidesLanguages);
router.get("/guides", user_controller_1.userController.getGuides);
router.get("/:id", user_controller_1.userController.getUser);
router.post("/create-tourist", user_controller_1.userController.createTourist);
router.post("/create-guide", user_controller_1.userController.createGuide);
router.post("/create-admin", user_controller_1.userController.createAdmin);
router.patch("/update-profile", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.GUIDE, client_1.UserRole.TOURIST), imageFileUploader_1.imageFileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.userController.updateProfile(req, res, next);
});
router.patch("/:id/status", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.updateProfileStatus);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map