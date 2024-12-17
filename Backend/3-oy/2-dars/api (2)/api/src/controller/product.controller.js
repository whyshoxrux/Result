import { Router } from "express";
import {
  addProduct
} from "../core/product/product.service.js";

const productRouter = Router();

productRouter.post("/", addProduct);

export default productRouter;
