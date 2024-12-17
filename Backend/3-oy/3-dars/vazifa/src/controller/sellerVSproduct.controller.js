import { Router } from "express";
import { join } from "../core/joinlar/sellerVSproducts.js";

const joinRouterr = Router()

joinRouterr.get("/", join)

export default joinRouterr