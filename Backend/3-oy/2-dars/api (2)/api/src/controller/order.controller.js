import { Router } from "express";
import {
  addOrder
} from "../core/order/order.service.js";

const orderRouter = Router();

orderRouter.post("/", addOrder);

export default orderRouter;
