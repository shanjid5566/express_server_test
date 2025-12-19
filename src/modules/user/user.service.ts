import { pool } from "../../config/db";

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const createUser = async (
  name: string,
  email: string,
  age: number,
  phone: string,
  address: string
) => {
  const result = await pool.query(
    `
        INSERT INTO users(name, email, age, phone, address) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, age, phone, address]
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

export const userService = {
  getUser,
  createUser,
  getSingleUser,
  updateUser,
};
