import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  getAllUsers,
  autologin,
} from "../core/user/user.service.js";
import AuthGuard from "../common/guards/auth.guard.js";
import accessControl from "../common/middleware/access-control.middleware.js";

const userRouter = Router();

userRouter.post("/register", AuthGuard, accessControl("ADMIN"), register);
userRouter.post("/login", login);
userRouter.post("/autologin", AuthGuard, autologin);

userRouter.get("/verify-email/:token", verifyEmail);
userRouter.get("/", getAllUsers);

export default userRouter;
