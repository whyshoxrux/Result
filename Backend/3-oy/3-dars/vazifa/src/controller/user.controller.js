import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  loginUser,
  update,
} from "../core/user/users.service.js";
import authGuard from "../common/guard/auth.guard.js";

const userRouter = Router();

userRouter.post("/", authGuard, add);
userRouter.get("/:id", authGuard, get);
userRouter.get("/", authGuard, getAll);
userRouter.put("/:id", authGuard, update);
userRouter.delete("/:id", authGuard, deletee);
userRouter.post("/login", loginUser);

export default userRouter