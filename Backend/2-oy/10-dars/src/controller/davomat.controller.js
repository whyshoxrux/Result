import { Router } from "express";
import {
  addDavomat,
  getDavomat,
  getAllDavomat,
  updateDavomat,
  deleteDavomat,
  join
} from "../core/davomat/davomat.service.js";

const davomatRouter = Router();

davomatRouter.post("/", addDavomat);
davomatRouter.get("/:id", getDavomat);
davomatRouter.get("/", getAllDavomat);
davomatRouter.put("/:id", updateDavomat);
davomatRouter.delete("/:id", deleteDavomat);
davomatRouter.get("/:1/:2", join); // 2 ta table ni bir biriga qoshib beradi

export default davomatRouter