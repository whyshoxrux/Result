import { Router } from "express";
import { add, getAll, tekshir } from "../../core/user.service.js";

const userRouter = Router();

userRouter.post("/register", add);
userRouter.get("/", getAll);
userRouter.get("/nima/:id", tekshir);

export default userRouter;
