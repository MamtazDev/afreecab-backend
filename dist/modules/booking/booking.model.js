"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    fromAddress: {
        type: String,
        required: true,
    },
    toAddress: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: String,
        required: true,
    },
    totalPassenger: {
        type: Number,
        required: true
    },
    totalLuggage: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
