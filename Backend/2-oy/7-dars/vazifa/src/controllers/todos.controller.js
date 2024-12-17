import { Router } from "express";
import {
  addToDo,
  getAllToDos,
  getTodo,
  updateToDo,
  deleteToDo,
} from "../core/user/todos.service.js";

const todosRouter = Router();

todosRouter.post("/", addToDo);
todosRouter.get("/", getAllToDos);
todosRouter.get("/:id", getTodo);
todosRouter.put("/:id", updateToDo);
todosRouter.delete("/:id", deleteToDo);

export default todosRouter;
