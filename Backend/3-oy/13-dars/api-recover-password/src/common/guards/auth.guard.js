import jwt from "jsonwebtoken";
import getConfig from "../config/config.service.js";

export async function authGuard(req, res, next) {
  const { token } = req.cookies;

  try {
    const result = await jwt.verify(token, getConfig("JWT_SECRET"));
    console.log("authGuard result", result);
    next();
  } catch (err) {
    res.status(403).send("Kirishga huquqingiz yetarli emas");
  }
}
