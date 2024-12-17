import { Router } from "express";
import { addUser, getAll, loginUser } from "../core/user/user.service.js";

const userRouter = Router()

userRouter.post("/", addUser)
userRouter.get("/", getAll)
userRouter.post("/login", loginUser)

export default userRouter