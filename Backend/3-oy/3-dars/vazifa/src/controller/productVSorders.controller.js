import { Router } from "express";
import { productVsorder } from "../core/joinlar/productVSorders.js";

const productVSorder = Router()

productVSorder.get("/", productVsorder)
export default productVSorder