import express, { Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.route";

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

app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get todo for indivisual user

app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM todos WHERE id = $1
      `,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todos not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        todo: result.rows[0],
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Update tod

app.put("/todos/:id", async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  // console.log(title,completed)
  try {
    const result = await pool.query(
      `
      UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *
      `,
      [title, completed, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});
// Delete Todos
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
