import jwt from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";

export const generateToken = async (user:IUser) => {
  return jwt.sign(
    { firstName: user.firstName, lastName:user.lastName, email: user.email, _id: user?._id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export const removeSensitiveInfo = (user:any) => {
    const { password, updatedAt, __v, createdAt, ...userWithoutPassword } =
      user.toObject();
    return userWithoutPassword;
  };