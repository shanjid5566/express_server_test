import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token as string, config.user_secret_key);
      console.log(decoded);
      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
export default auth;
