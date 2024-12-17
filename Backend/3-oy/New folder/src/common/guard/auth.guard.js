import jwt from "jsonwebtoken";
import CustomError from "../exception/custom.error.js";
import getConfig from "../config/config.service.js";
import { findUserByEmail } from "../../core/user.service.js";
const AuthGuard = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Postmandan kiritgan tokenni ajratvolish
    // const token = req.cookies //! Cookiesdagi tokenni ajratvolish

    if (!token) {
      throw new CustomError("Kalit berilmagan", 403);
    }

    
    const result = await jwt.verify(token, getConfig("JWT_ACCESS_SECRET"));
    req.user = await findUserByEmail(result.email);

    const userAgent = req.headers["user-agent"];
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);
    next();
  } catch (err) {
    next(err);
  }
};
export default AuthGuard;
