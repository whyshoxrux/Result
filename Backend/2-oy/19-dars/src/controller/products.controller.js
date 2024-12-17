import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/products/products.service.js";

const productRouter = Router();

productRouter.post("/", add);
productRouter.get("/", getAll);
productRouter.get("/:id", get);
productRouter.put("/:id", update);
productRouter.delete("/:id", deletee);


export default productRouter