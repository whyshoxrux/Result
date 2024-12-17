import { Router } from "express";
import { add } from "../../core/user.service.js";

const userRouter = Router()

userRouter.post('/send-email', add)

export default userRouter