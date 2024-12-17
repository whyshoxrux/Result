import { Router } from "express";
import {
  loginUser,
  recovery,
  registerUser,
  renderLogin,
  renderRecovery,
  renderRegister,
} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.get("/register", renderRegister);
userRouter.get("/login", renderLogin);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/recover-password/:token", renderRecovery);
userRouter.put("/recover", recovery)
export default userRouter