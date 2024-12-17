import { Router } from "express";
import { add } from "../../core/user.service.js";

const userRouter = Router()

userRouter.post("/register", add)
// userRouter.get("/", getAll)
// userRouter.get("/register", tekshir)

export default userRouter