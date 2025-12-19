import express, { Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.route";
import { todoRoute } from "./modules/todo/todo.route";
import { authRoutes } from "./modules/auth/auth.route";
import auth from "./middleware/auth";

const app = express();
const port = config.port;

initDB();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!.....");
});

// Users  Route
app.use("/users", logger, auth(), userRoute);


// Create To for indivisual user

app.use("/todos", todoRoute);


// Auth routes
app.use("/auth",authRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
