import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/seller/seller.service.js";

const sellerRouter = Router();

sellerRouter.post("/", add);
sellerRouter.get("/", getAll);
sellerRouter.get("/:id", get);
sellerRouter.put("/:id", update);
sellerRouter.delete("/:id", deletee);
export default sellerRouter