import { Router } from "express";
import AuthGuard from "../common/guard/auth.guard.js";
import accessControle from "../common/middlewares/access.controle.js";
import {
  autologin,
  getAllUsers,
  login,
  register,
  verifyEmail,
} from "../core/user.service.js";

const userRouter = Router();

userRouter.post("/register", AuthGuard, accessControle("ADMIN"), register);
userRouter.post("/login", login);
userRouter.post("/autologin", AuthGuard, autologin);

userRouter.get("/verify-email/:token", verifyEmail);
userRouter.get("/", getAllUsers);

export default userRouter;