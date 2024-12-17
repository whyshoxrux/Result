import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/orders/orders.service.js";

const orderRouter = Router();

orderRouter.post("/", add);
orderRouter.get("/", getAll);
orderRouter.get("/:id", get);
orderRouter.put("/:id", update);
orderRouter.delete("/:id", deletee);
export default orderRouter