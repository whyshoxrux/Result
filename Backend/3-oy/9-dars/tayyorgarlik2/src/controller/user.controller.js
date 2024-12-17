import { Router } from "express";
import { add, getAll, login } from "../core/user/user.service.js";

const userRouter = Router()

userRouter.post("/register", add)
userRouter.post("/login", login)
userRouter.get("/", getAll)

export default userRouter