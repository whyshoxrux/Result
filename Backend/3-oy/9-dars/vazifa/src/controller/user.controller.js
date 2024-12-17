import { Router } from "express";
import { getAll, loginUser, register } from "../core/user/user.service.js";

const userRouter = Router()

userRouter.post("/register", register)
userRouter.post("/login", loginUser)
userRouter.get("/", getAll)

export default userRouter