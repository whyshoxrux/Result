import { Router } from "express";
import {addUser, getAllUser, getUser} from "../core/user/user.service.js"
import { updateUser } from "../core/user/user.service.js";
import { deleteUser } from "../core/user/user.service.js";

const userRouter = Router();

userRouter.post("/", addUser)
userRouter.get("/", getAllUser)
userRouter.get("/:id", getUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


export default userRouter;