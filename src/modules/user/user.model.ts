import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image:{
      type:String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
