import exprss, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const route = exprss.Router();

route.get("/", userController.getUser);

route.post("/", userController.createUser);

route.get("/:id", userController.getSingleUser);
route.put("/:id", userController.updateUser);

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
