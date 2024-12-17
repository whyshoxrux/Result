import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/publishers/publishers.service.js";
import accessControle from "../common/middlewares/access.controle.js";
import AuthGuard from "../common/guard/auth.guard.js";

const publisherRouter = Router();

publisherRouter.post("/", AuthGuard, accessControle("ADMIN"), add);
publisherRouter.get("/", getAll);
publisherRouter.get("/:id", get);
publisherRouter.put("/:id", AuthGuard, accessControle("ADMIN"), update);
publisherRouter.delete("/:id", AuthGuard, accessControle("ADMIN"), deletee);

export default publisherRouter;
