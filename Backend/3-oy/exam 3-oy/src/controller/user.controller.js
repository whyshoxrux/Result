import { Router } from "express";
import accessControle from "../common/middlewares/access.controle.js";
import {
  deletee,
  get,
  getAllUsers,
  login,
  register,
  update,
  verifyEmail,
} from "../core/users/user.service.js";
import AuthGuard from "../common/guard/auth.guard.js";

const userRouter = Router();

userRouter.post("/",  register);
userRouter.post("/login", login);

userRouter.get("/verify-email/:token", verifyEmail);
userRouter.get("/", AuthGuard, accessControle("ADMIN"), getAllUsers);
userRouter.get("/:id", AuthGuard, accessControle("ADMIN"), get);
userRouter.put("/:id", AuthGuard, accessControle("ADMIN"), update);
userRouter.delete("/:id", AuthGuard, accessControle("ADMIN"), deletee);

export default userRouter;
