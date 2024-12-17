import { Router } from "express";
import { join } from "../core/joinlar/sellerVSusers.js";

const joinRouter = Router()

joinRouter.get("/", join)

export default joinRouter