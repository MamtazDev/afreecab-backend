import { Schema } from "mongoose";

export interface IBooking {
    _id: string;
    fromAddress:string;
    toAddress:string;
    bookingDate:string;
    totalPassenger:number;
    totalLuggage:number;
    user: Schema.Types.ObjectId;
    amount: number;
    isPaid: boolean;
}

