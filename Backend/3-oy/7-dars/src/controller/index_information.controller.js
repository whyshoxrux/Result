import { Router } from "express";
import { add, deletee, get, getAll, update } from "../core/index_information/index_information.service.js";

const index_informationRouter = Router()

index_informationRouter.post("/", add)
index_informationRouter.get("/:index_information_id", get)
index_informationRouter.get("/", getAll)
index_informationRouter.put("/:index_information_id", update)
index_informationRouter.delete("/:index_information_id", deletee)

export default index_informationRouter