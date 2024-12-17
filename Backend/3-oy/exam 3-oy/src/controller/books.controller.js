import { Router } from "express";
import {
  add,
  deletee,
  get,
  getAll,
  update,
} from "../core/books/books.service.js";
import accessControle from "../common/middlewares/access.controle.js";
import AuthGuard from "../common/guard/auth.guard.js";

const booksRouter = Router();

booksRouter.post("/", AuthGuard, accessControle("ADMIN"), add);
booksRouter.get("/", getAll);
booksRouter.get("/:id", get);
booksRouter.put("/:id", AuthGuard, accessControle("ADMIN"), update);
booksRouter.delete("/:id", AuthGuard, accessControle("ADMIN"), deletee);

export default booksRouter;
