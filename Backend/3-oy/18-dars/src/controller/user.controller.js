import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  getAllUsers,
} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/verify-email/:token", verifyEmail);
userRouter.get("/", getAllUsers);

export default userRouter;
