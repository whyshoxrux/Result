import { Router } from "express";
import { joinUserVSOrder } from "../core/joinlar/usersVSorder.js";

const userVSorderRouter = Router()

userVSorderRouter.get("/", joinUserVSOrder)
export default userVSorderRouter