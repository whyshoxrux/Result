import { Router } from "express";
import { add, deletee, get, getAll, update } from "../core/kafedra/kafedra.service.js";

const kafedraRouter = Router()

kafedraRouter.post("/", add)
kafedraRouter.get("/:kafedra_id", get)
kafedraRouter.get("/", getAll)
kafedraRouter.put("/:kafedra_id", update)
kafedraRouter.delete("/:kafedra_id", deletee)

export default kafedraRouter