import { Router } from "express";
import {
  addUser,
  loginUser,
  renderloginUser,
  renderuser,
} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.get("/register", renderuser);
userRouter.post("/register", addUser);
userRouter.get("/login", renderloginUser);
userRouter.post("/login", loginUser);

export default userRouter 