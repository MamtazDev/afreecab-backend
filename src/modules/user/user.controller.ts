import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import { generateToken, removeSensitiveInfo } from "../../utils/auth";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        success: false,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        
      });

      const user = await newUser.save();
      const token = await generateToken(user);
      res.status(200).send({
        message: "Account created  successfully",
        success: true,
        user: removeSensitiveInfo(user),
        accessToken: token,
      });
    }
  } catch (err:any) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        success: false,
        type: "email",
        message: "User not found",
      });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = await generateToken(user);
      return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user: removeSensitiveInfo(user),
        accessToken,
      });
    } else {
      res.status(401).send({
        success: false,
        type: "password",
        message: "Invalid password",
      });
    }
  } catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

export const getloggedInUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req?.user?._id });
    if (user) {
      res.status(200).send(removeSensitiveInfo(user));
    } else {
      res.status(401).send("User Not Found");
    }
  } catch (err:any) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).sort({ _id: -1 }).select("-password");
    res.status(200).send({
      data: users,
    });
  } catch (err:any) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result:any) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          success: true,
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: err.message,
          success: false,
        });
      });
  } catch (err:any) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("User Not Found");
    }
  } catch (err:any) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { ...info } = req.body;

    const isExist = await User.findOne({ _id: req.user._id });


    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.user._id },
        info,
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "User Info Update successfully",
        data: removeSensitiveInfo(result),
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (err:any) {
    res.status(201).json({
      success: false,
      message: err.message,
    });
  }
};
