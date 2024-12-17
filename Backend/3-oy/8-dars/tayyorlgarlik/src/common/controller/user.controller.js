import { Router } from "express";
import { add, getAll, tekshir } from "../../core/user.service.js";

const userRouter = Router()

userRouter.post("/register", add)
userRouter.get("/", getAll)
userRouter.get("/register", tekshir)

export default userRouter