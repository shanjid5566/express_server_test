import { Request, Response } from "express";
import { userService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
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
};
const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  // const { name, email,password, age, phone, address } = req.body;

  try {
    const result = await userService.createUser(
      req.body
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
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.params.id as string);
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
};

const updateUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  const { name, email } = req.body;
  try {
    const result = await userService.updateUser(name as string, email as string, req.params.id as string) ;

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
}

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await userService.deleteUser(req.params.id as string);

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
}
export const userController = {
  getUser,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
};
