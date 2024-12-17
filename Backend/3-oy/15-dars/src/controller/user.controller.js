import { Router } from "express";
import { register, login, getAllUsers } from "../core/user/user.service.js";

const userRouter = Router();

userRouter.get("/register", (req, res) => {
  res.render("register", { layout: false });
});
userRouter.post("/register", register);
userRouter.get("/login", (req, res) => {
  res.render("login", { layout: false });
});
userRouter.post("/login", login);
userRouter.get("/", getAllUsers);
export default userRouter;
