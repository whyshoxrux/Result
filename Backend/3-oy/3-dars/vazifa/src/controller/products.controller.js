import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/products/products.service.js";
import authGuard from "../common/guard/auth.guard.js";

const productRouter = Router();

productRouter.post("/", authGuard, add);
productRouter.get("/", authGuard, getAll);
productRouter.get("/:id",authGuard, get);
productRouter.put("/:id", authGuard, update);
productRouter.delete("/:id", authGuard, deletee);
export default productRouter