import { Router } from "express";
import {
  addUser
} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.post("/", addUser);

export default userRouter;
