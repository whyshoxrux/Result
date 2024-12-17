import jwt from "jsonwebtoken";
import getConfig from "../config/config.service.js";
import { devices, findUserByPhone } from "../../core/user/user.service.js";
import DeviceDetector from "device-detector-js";

export async function authGuard(req, res, next) {
  try {
    console.log(req.cookies);
    
    const { Token } = req.cookies;
    console.log("authGuard", Token);
    const result = await jwt.verify(Token, getConfig("JWT_SECRET"));
    const { phone } = result;
    req.user = await findUserByPhone(phone);

    const userAgent = req.headers['user-agent']
    const deviceDetector = new DeviceDetector()
    const currentdevice = deviceDetector.parse(userAgent)


    const loginDevice = devices[phone];
    console.log("loginDevice", loginDevice)
    console.log("currentdevice",currentdevice)

    if(JSON.stringify(loginDevice) != JSON.stringify(currentdevice)){
      return res.redirect('/user/login')
    }


    next();
  } catch (err) {
    res.status(403).send("Huquqingiz yetarli emas");
  }
}
