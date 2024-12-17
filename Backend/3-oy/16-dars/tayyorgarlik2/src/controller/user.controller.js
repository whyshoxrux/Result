import { Router } from "express";
import { getAll, login, register } from "../core/user/user.service.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.get("/", getAll);
userRouter.post("/login", login);


userRouter.get("/register", (req, res) => {
    res.render("register", {layout: false})
})
userRouter.get("/login", (req, res) => {
    res.render("login", {layout: false})
})

export default userRouter;
