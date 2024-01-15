import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare module 'express-serve-static-core' {
    interface Request {
      user?: any; 
    }
  }


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.user = decoded;
      next();
    });
  } catch (err:any) {
    res.status(401).send({
      message: err.message,
    });
  }
};
