import express from "express";
import { isAuth } from "../../utils/middleware";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getloggedInUserInfo,
  loginUser,
  registerUser,
  updateUserInfo,
} from "./user.controller";
import upload from "../../config/multerConfig";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", getAllUsers);
router.get("/myInfo", isAuth, getloggedInUserInfo);
router.get("/userInfo/:id", isAuth, getUser);

router.delete("/deleteUser/:id", isAuth, deleteUser);

router.patch(
  "/updateUserInfo/id",
  isAuth,
  upload.single("image"),
  updateUserInfo
);

export default router;
