import jwt from "jsonwebtoken";
import getConfig from "../config/config.service.js";
import { findUserByPhone } from "../../core/user/user.service.js";
export async function authGuard(req, res, next) {
  try {
    const { token } = req.cookies;

    const result = await jwt.verify(token, getConfig("JWT_SECRET"));
    const { phone } = result;
    req.user = await findUserByPhone(phone);
    next();
  } catch (err) {
    res.send("Huquqingiz yetarli emas");
  }
}
