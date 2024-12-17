import dotenv from "dotenv";

dotenv.config();
export default function getConfig(name) {
  return process.env[name];
}
