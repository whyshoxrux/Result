import dotenv from "dotenv";
dotenv.config();

export function getConfig(name) {
  return process.env[name];
}
