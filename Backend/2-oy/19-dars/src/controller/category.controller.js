import { Router } from "express";
import { add, deletee, get, getAll, update } from "../core/category/category.service.js";


const categoryRouter = Router();

categoryRouter.post("/", add);
categoryRouter.get("/", getAll);
categoryRouter.get("/:id", get);
categoryRouter.put("/:id", update);
categoryRouter.delete("/:id", deletee);


export default categoryRouter