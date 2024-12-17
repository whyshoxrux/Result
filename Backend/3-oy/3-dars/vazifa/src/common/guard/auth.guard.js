import jwt from "jsonwebtoken";
import { getconfig } from "../config/config.service.js";
import { findUserByEmail } from "../../core/user/users.service.js";

async function authGuard(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).send("Kalit berilmagan");
  }
  try {
    const result = await jwt.verify(token, getconfig("JWT_SECRET"));
    req.user = await findUserByEmail(result.email);
    next();
  } catch (err) {
    res.status(400).send("Notog'ri kalit");
  }
}
export default authGuard;