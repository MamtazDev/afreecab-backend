import express from "express";
import { isAuth } from "../../utils/middleware";
import { deleteUser, getAllUsers, getUser, getloggedInUserInfo, loginUser, registerUser, updateUserInfo } from "./user.controller";




const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", isAuth, getAllUsers);
router.get("/myInfo", isAuth, getloggedInUserInfo);
router.get("/userInfo/:id", isAuth, getUser);

router.delete("/deleteUser/:id", isAuth, deleteUser);

router.patch("/updateUserInfo", isAuth, updateUserInfo);

export default router;
