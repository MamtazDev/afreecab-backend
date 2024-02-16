"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

exports.getBookingById = exports.getMyBookings = exports.getAllBookings = exports.updatePaymentStatus = exports.createBooking = void 0;
const booking_model_1 = __importDefault(require("./booking.model"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingInfo = Object.assign({ user: req.user._id }, req.body);
        const newBooking = new booking_model_1.default(bookingInfo);
        const booking = yield newBooking.save();
        res.status(200).send({
            message: "Booking created  successfully",
            success: true,
            data: booking
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.createBooking = createBooking;
const updatePaymentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_model_1.default.findByIdAndUpdate({ _id: req.params.id }, {
            isPaid: true
        }, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "User Info Update successfully",
            data: booking,
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.updatePaymentStatus = updatePaymentStatus;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield booking_model_1.default.find({}).populate("user");
        res.status(200).json(allBookings);
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.getAllBookings = getAllBookings;
const getMyBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield booking_model_1.default.find({ user: req.user._id });
        res.status(200).json(allBookings);
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.getMyBookings = getMyBookings;
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_model_1.default.findById(req.params.id);
        res.status(200).json(booking);
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.getBookingById = getBookingById;
