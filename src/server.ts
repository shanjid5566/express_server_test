import express, { Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";

const app = express();
const port = config.port;


initDB();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!.....");
});
// Users Post Route
app.post("/users", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, age, phone, address } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO users(name, email, age, phone, address) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [name, email, age, phone, address]
    );
    res.status(201).json({
      success: true,
      message: "Successfully User Created.",
      user: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Users Get Route

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    // console.log(result)
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      users: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get single users

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "users Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "users retrieved successfully",
        users: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update user
app.put("/users/:id", async (req: Request, res: Response) => {
  // console.log(req.params.id);
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete user

app.delete("/users/:id", async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
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
