import express, { Request, Response } from "express";

import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.route";
import { todoRoute } from "./modules/todo/todo.route";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();

initDB();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!.....");
});

// Users  Route
app.use("/users", logger, userRoute);

// Create To for indivisual user

app.use("/todos", todoRoute);

// Auth routes
app.use("/auth", authRoutes);

export default app;
