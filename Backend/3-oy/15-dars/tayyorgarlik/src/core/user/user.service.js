import getConfig from "../../common/config/config.service.js";
import UserModel from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function register(req, res) {
  try {
    const newData = req.body;

    const dbUser = await findUserByPhone(newData.phone);
    if (dbUser) {
      return res.send("Bunday telefon raqam oldin ro'yxatdan o'tgan");
    }

    const hashedPassword = await bcrypt.hash(newData.password, 10);

    const result = await UserModel.create({
      ...newData,
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

export async function getAll(req, res) {
  try {
    const result = await UserModel.findAll();
    res.send(result);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function login(req, res) {
  try {
    const user = req.body;
    const dbUser = await findUserByPhone(user.phone);
    if (!dbUser) {
      return res.send("Bunday telefon raqam ro'yxatdan o'tmagan");
    }

    const checkPassword = await bcrypt.compare(user.password, dbUser.password);

    if (!checkPassword) {
      return res.send("Telefon yoki parolda xatolik");
    }

    const token = await accessToken({ phone: user.phone });

    res.cookie("token", token);
    res.redirect("/payment/transfer");
  } catch (err) {
    res.send("Erorr: " + err.message);
  }
}

function accessToken(data) {
  return jwt.sign(data, getConfig("JWT_SECRET"), { expiresIn: "1h" });
}
