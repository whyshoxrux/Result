import { Router } from "express";
import {
  addUser,
  deletee,
  get,
  getAllUsers,
  update,
} from "../core/class/class.service.js";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", get);
userRouter.put("/:id", update)
userRouter.delete("/:id", deletee)

export default userRouter;
