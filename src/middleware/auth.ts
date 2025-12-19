import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string, config.user_secret_key);
    console.log(decoded);
    next();
  };
};
export default auth;
