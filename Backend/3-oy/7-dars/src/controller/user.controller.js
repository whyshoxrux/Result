import { Router } from "express";
import {
  addUser,
  deletee,
  get,
  getAll,
  loginUser,
  update,
} from "../core/user/user.service.js";

const userRouter = Router();

userRouter.post("/register", addUser);
userRouter.get("/", getAll);
userRouter.get("/:user_id", get);
userRouter.post("/login", loginUser);
userRouter.put("/:user_id", update);
userRouter.delete("/:user_id", deletee);

export default userRouter;
