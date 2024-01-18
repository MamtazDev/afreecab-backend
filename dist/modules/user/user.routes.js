"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../utils/middleware");
const user_controller_1 = require("./user.controller");
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
router.get("/", middleware_1.isAuth, user_controller_1.getAllUsers);
router.get("/myInfo", middleware_1.isAuth, user_controller_1.getloggedInUserInfo);
router.get("/userInfo/:id", middleware_1.isAuth, user_controller_1.getUser);
router.delete("/deleteUser/:id", middleware_1.isAuth, user_controller_1.deleteUser);
router.patch("/updateUserInfo", middleware_1.isAuth, multerConfig_1.default.single("image"), user_controller_1.updateUserInfo);
exports.default = router;
