import { Router } from "express";
import { add, get } from "../service/service.js";

const userRouter = Router();

userRouter.post("/login", add);
userRouter.post("/register", get);

export default userRouter