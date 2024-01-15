import express from "express";
import { createBooking, getAllBookings, getMyBookings, updatePaymentStatus } from "./booking.controller";
import { isAuth } from "../../utils/middleware";






const router = express.Router();

router.post("/addBooking",isAuth, createBooking);


router.get("/", isAuth, getAllBookings);
router.get("/myBookings", isAuth, getMyBookings);
// router.get("/userInfo/:id", isAuth, getUser);

// router.delete("/deleteUser/:id", isAuth, deleteUser);

router.patch("/pamentStatus/:id",isAuth,updatePaymentStatus );

export default router;
