import { Router } from "express";
import { add, getAll, login, update } from "../core/user.service.js";

const userRouter = Router();

userRouter.post("/register", add);
userRouter.post("/login", login);
userRouter.put("/:id", update);
userRouter.get("/", getAll);

export default userRouter