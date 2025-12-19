import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, age, phone, address } = payload;
  const hasedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name, email,password , age, phone, address) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, email, hasedPass, age, phone, address]
  );
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};
const updateUser = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );
  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};
export const userService = {
  getUser,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
