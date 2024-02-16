"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const middleware_1 = require("../../utils/middleware");
const router = express_1.default.Router();
router.post("/addBooking", middleware_1.isAuth, booking_controller_1.createBooking);
router.get("/", middleware_1.isAuth, booking_controller_1.getAllBookings);
router.get("/myBookings", middleware_1.isAuth, booking_controller_1.getMyBookings);
router.get("/singleBooking/:id", middleware_1.isAuth, booking_controller_1.getBookingById);
// router.delete("/deleteUser/:id", isAuth, deleteUser);
router.patch("/pamentStatus/:id", middleware_1.isAuth, booking_controller_1.updatePaymentStatus);
exports.default = router;
