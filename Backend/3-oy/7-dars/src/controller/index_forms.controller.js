import { Router } from "express";
import { add, deletee, get, getAll, update } from "../core/index_forms/index_forms.service.js";

const index_formRouter = Router()

index_formRouter.post("/", add)
index_formRouter.get("/", getAll)
index_formRouter.get("/:index_form_id", get)
index_formRouter.put("/:index_form_id", update)
index_formRouter.delete("/:index_form_id", deletee)

export default index_formRouter