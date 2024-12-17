import { Router } from "express";
import { add, deletee, get, getAll, update } from "../core/orders/orders.service.js";


const ordersRouter = Router();

ordersRouter.post("/", add);
ordersRouter.get("/", getAll);
ordersRouter.get("/:id", get);
ordersRouter.put("/:id", update);
ordersRouter.delete("/:id", deletee);


export default ordersRouter