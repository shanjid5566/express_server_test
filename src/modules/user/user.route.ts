import exprss, { Request, Response } from "express";
import { pool } from "../../config/db";

const route = exprss.Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    // console.log(result)
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      users: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

route.post("/", async (req: Request, res: Response) => {
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

route.get("/:id", async (req: Request, res: Response) => {
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
route.put("/:id", async (req: Request, res: Response) => {
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

route.delete("/:id", async (req: Request, res: Response) => {
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
export const userRoute = route;
