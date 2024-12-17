import { Router } from "express";
import { add, getAll } from "../core/guide.service/guide.service.js";

const guidesRouter = Router();

guidesRouter.post("/", add);
guidesRouter.get("/", getAll);

export default guidesRouter