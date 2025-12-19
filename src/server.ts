import express, { Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.route";
import { todoRoute } from "./modules/todo/todo.route";

const app = express();
const port = config.port;

initDB();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!.....");
});

// Users Get Route
app.use("/users", logger, userRoute);

// Users Post Route
app.use("/users", userRoute);

// Get single users

app.use("/users", userRoute);

// Update user
app.use("/users", userRoute);

// Delete user

app.use("/users",userRoute);
// Create To for indivisual user

app.use("/todos", todoRoute);

// Get todo for indivisual user

app.use("/todos", todoRoute);

// Update todo

app.use("/todos/:id",todoRoute);
// Delete Todos
app.use("/todos/:id", todoRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
