import jwt from "jsonwebtoken";
import { getConfig } from "../config/config.service.js";
import { findUserByEmail } from "../../core/user/user.service.js";

export async function authGuard(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).send("key was not given");
  }
  try {
    const result = jwt.verify(token, getConfig("JWT_SECRET"));
    req.user = await findUserByEmail(result.email);
    next();
  } catch (err) {
    res.send(500).send("Wrong key");
  }
}
