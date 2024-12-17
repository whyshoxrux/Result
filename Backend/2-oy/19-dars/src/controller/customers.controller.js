import { Router } from "express";
import { add, deletee, get, getAll, update } from "../core/customers/customers.service.js";


const customerRouter = Router();

customerRouter.post("/", add);
customerRouter.get("/", getAll);
customerRouter.get("/:id", get);
customerRouter.put("/:id", update);
customerRouter.delete("/:id", deletee);


export default customerRouter