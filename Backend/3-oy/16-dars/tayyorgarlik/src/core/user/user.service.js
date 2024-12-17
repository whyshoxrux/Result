import DeviceDetector from "device-detector-js";
import UserModel from "./user.model.js";
import bcrypt from "bcryptjs";
import getConfig from "../../common/config/config.service.js";
import jwt from 'jsonwebtoken'

export const devices = {};

export async function register(req, res) {
  try {
    const newUser = req.body;

    if (dbUser) {
      return res.send("Bunday telefon raqam oldin ro'yxatdan o'tgan");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const result = await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });
    res.send(result);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export function findUserByPhone(phone) {
  return UserModel.findOne({ where: { phone } });
}

export async function getAllUser(req, res) {
  try {
    const result = await UserModel.findAll();
    res.send(result);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function login(req, res) {
  try {
    const userAgent = req.headers["user-agent"];
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);

    console.log("userAgent", userAgent);
    console.log("device", device);
    const user = req.body;

    const dbUser = await findUserByPhone(user.phone);
    if (!dbUser) {
      return res.send("Bunday telefon raqam ro'yxatdan o'tmagan");
    }

    const checkPassword = await bcrypt.compare(user.password, dbUser.password);

    if (!checkPassword) {
      return res.send("Telefon yoki parol xato");
    }
    const token = await kalitYasash({ phone: user.phone });

    devices[user.phone] = device;
    res.cookie("Token", token);
    res.redirect("/payment/transfer");
  } catch (err) {
    console.log(err);
    
    res.send("Error: " + err.message);
  }
}

function kalitYasash(data) {
  return jwt.sign(data, getConfig("JWT_SECRET"), { expiresIn: "1h" });
}
