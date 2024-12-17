import { Router } from "express";
import {
  addUser,
  loginUser,
  renderLoginUser,
  renderUser,
} from "../core/user.service.js";

const userRouter = Router();

userRouter.get("/register", renderUser);
userRouter.post("/register", addUser);
userRouter.get("/login", renderLoginUser);
userRouter.post("/login", loginUser);

export default userRouter