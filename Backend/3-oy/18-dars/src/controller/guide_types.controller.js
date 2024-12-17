import { Router } from "express";
import { add, getAll } from "../core/guide_types/guide_types.service.js";

const guide_typesRouter = Router()

guide_typesRouter.post("/", add)
guide_typesRouter.get("/", getAll)


export default guide_typesRouter