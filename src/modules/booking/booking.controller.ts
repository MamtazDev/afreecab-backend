import {  Request, Response } from "express";
import Booking from "./booking.model";

export const createBooking = async(req: Request, res: Response)=>{
try {
    const bookingInfo ={
        user: req.user._id,
        ...req.body
    }
    const newBooking = new Booking(bookingInfo)
    const booking = await newBooking.save()
    res.status(200).send({
        message: "Booking created  successfully",
        success: true,
       data: booking
      });


} catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
}

export const updatePaymentStatus = async(req: Request, res: Response)=>{
 try {
    const booking = await Booking.findByIdAndUpdate( { _id: req.params.id },
        {
            isPaid:true},
        {
          new: true,
        });


        res.status(200).json({
            success: true,
            message: "User Info Update successfully",
            data:booking,
          });
 } catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
}

export const getAllBookings = async(req: Request, res: Response)=>{
try {
    const allBookings = await Booking.find({});

    res.status(200).json(allBookings);
} catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
}

export const getMyBookings = async(req: Request, res: Response)=>{
try {
    const allBookings = await Booking.find({user:req.user._id});

    res.status(200).json(allBookings);
} catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
}
export const getBookingById = async(req: Request, res: Response)=>{
try {
    const booking = await Booking.findById(req.params.id);

    res.status(200).json(booking);
} catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
}