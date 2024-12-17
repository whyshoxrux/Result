import { Router } from "express";
import {
  addUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
