import { Router } from "express";
import {
  addUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../core/user/user.service.js";

const userController = Router();

userController.post("/", addUser);
userController.get("/", getAllUser);
userController.get("/:id", getUser);
userController.put("/:id", updateUser);
userController.delete("/:id", deleteUser);

export default userController;
