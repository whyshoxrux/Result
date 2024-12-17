import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/orders/orders.service.js";
import accessControle from "../common/middlewares/access.controle.js";
import AuthGuard from "../common/guard/auth.guard.js";

const ordersRouter = Router();

ordersRouter.post("/", AuthGuard, accessControle("USER"), add);
ordersRouter.get("/", getAll);
ordersRouter.get("/:id", get);
ordersRouter.put("/:id", AuthGuard, accessControle("USER"), update);
ordersRouter.delete("/:id", AuthGuard, accessControle("USER"), deletee);

export default ordersRouter;
