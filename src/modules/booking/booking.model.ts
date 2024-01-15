import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";



const bookingSchema = new Schema<IBooking>(
  {
    fromAddress:{
        type: String,
        required:true,
    },
    toAddress:{
        type: String,
        required:true,
    },
    bookingDate:{
        type:String,
        required:true,
    },
    totalPassenger:{
        type:Number,
        required:true
    },
    totalLuggage:{
        type:Number,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    isPaid: {
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;
