import { Router } from "express";
import { loginUser, registerUser, renderLogin, renderLoginList, renderRegister } from "../core/user/user.service.js";

const userRouter = Router();

userRouter.get("/register", renderRegister);
userRouter.post("/register", registerUser);
userRouter.get("/login-list", renderLoginList);
userRouter.post("/login-list", loginUser)

export default userRouter;
