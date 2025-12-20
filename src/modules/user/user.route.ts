import exprss, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = exprss.Router();

route.get("/", auth("admin"), userController.getUser);

route.post("/", userController.createUser);

route.get("/:id", auth("admin", "user"), userController.getSingleUser);
route.put("/:id", userController.updateUser);

route.delete("/:id", userController.deleteUser);
export const userRoute = route;
