import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/categories/categories.service.js";
import accessControle from "../common/middlewares/access.controle.js";
import AuthGuard from "../common/guard/auth.guard.js";

const categoriesRouter = Router();

categoriesRouter.post("/", AuthGuard, accessControle("ADMIN"), add);
categoriesRouter.get("/", getAll);
categoriesRouter.get("/:id", get);
categoriesRouter.put("/:id", AuthGuard, accessControle("ADMIN"), update);
categoriesRouter.delete("/:id", AuthGuard, accessControle("ADMIN"), deletee);

export default categoriesRouter;
