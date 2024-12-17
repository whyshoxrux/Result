import jwt from 'jsonwebtoken'
import getConfig from '../config/config.service.js'
import { findUserByPhone } from '../../core/user/user.service.js';

export async function authGuard(req, res, next) {
    try {
      const token = req.cookies?.token;  // Safely access token from cookies
      if (!token) {
        return res.status(401).send("Token topilmadi, iltimos tizimga kiring");
      }
  
      console.log("authGuard", token);
  
      const result = await jwt.verify(token, getConfig("JWT_SECRET"));
      console.log(result)
      const { phone } = result;
  
      req.user = await findUserByPhone(phone);
  
      if (!req.user) {
        return res.status(403).send("Foydalanuvchi topilmadi");
      }
  
      next(); // Continue to the next middleware or route
    } catch (error) {
      console.log(error);
      res.status(403).send("Huquqingiz yetarli emas yoki token noto'g'ri");
    }
  }
  