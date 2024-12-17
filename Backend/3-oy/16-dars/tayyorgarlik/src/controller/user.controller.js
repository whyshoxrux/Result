import { Router } from "express";
import { getAllUser, login, register } from "../core/user/user.service.js";

const userRouter = Router()

userRouter.get("/register", (req, res) => {
    res.render("register", {layout: false});
})
userRouter.post("/register", register)
userRouter.get("/login", (req, res) => {
    res.render("login", {layout: false});
})
userRouter.post("/login", login)
userRouter.get("/", getAllUser)
export default userRouter