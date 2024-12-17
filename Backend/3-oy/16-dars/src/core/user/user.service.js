import UserModel from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getConfig from "../../common/config/config.service.js";
import DeviceDetector from "device-detector-js";

export const devices = {}

export async function register(req, res) {
  try {
    const newUser = req.body;

    const dbUser = await findUserByPhone(newUser.phone);
    if (dbUser) {
      return res.status(400).send("Bunday telefon raqam oldin royhatdan otgan");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const result = await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Hatolik boldi" + error.message);
  }
}
export function findUserByPhone(phone) {
  return UserModel.findOne({ where: { phone } });
}
export async function getAllUsers(req, res) {
  try {
    const result = await UserModel.findAll();
    res.send(result);
  } catch (err) {}
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
      return res.status(404).send("Bunday telefon raqam royhatdan otmagan");
    }

    const checkPassword = await bcrypt.compare(user.password, dbUser.password);

    if (!checkPassword) {
      return res.status(403).send("Telefon yoki parol hato");
    }
    const token = await kalitYasash({ phone: user.phone });

    devices[user.phone] = device
    res.cookie("token", token);
    res.redirect("/payment/transfer");
  } catch (error) {
    res.status(500).send("Hatolik boldi" + error.message);
  }
}
function kalitYasash(data) {
  return jwt.sign(data, getConfig("JWT_SECRET"), { expiresIn: "1h" });
}
