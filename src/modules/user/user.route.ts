import exprss, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const route = exprss.Router();

route.get("/", userController.getUser);

route.post("/", userController.createUser);

route.get("/:id", userController.getSingleUser);
route.put("/:id", userController.updateUser);

route.delete("/:id", userController.deleteUser);
export const userRoute = route;
