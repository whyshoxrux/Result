import jwt from "jsonwebtoken";
import CustomError from "../exception/custom.error.js";
import getConfig from "../config/config.service.js";
import { findUserByEmail } from "../../core/users/user.service.js";
const AuthGuard = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Postmandan kiritgan tokenni ajratvolish

    // const token = req.cookies //! Cookiesdagi tokenni ajratvolish

    console.log(token);

    if (!token) {
      throw new CustomError("Kalit berilmagan", 403);
    }

    const result = await jwt.verify(token, getConfig("JWT_ACCESS_SECRET"));
    req.user = await findUserByEmail(result.email);

    next();
  } catch (err) {
    next(err);
  }
};
export default AuthGuard;
