import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connection_str: `${process.env.Connection_Str}`,
  port: `${process.env.PORT}`,
  user_secret_key: `${process.env.USER_SECRET_KEY}`,
};
export default config;
