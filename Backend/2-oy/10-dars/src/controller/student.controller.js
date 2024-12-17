import { Router } from "express";

import {
  addStudent,
  deleteStudent,
  getAllStudent,
  getStudent,
  updateStudent,
} from "../core/talaba/talaba.service.js";

const talabarouter = Router();

talabarouter.post("/", addStudent);
talabarouter.get("/:id", getStudent);
talabarouter.get("/", getAllStudent);
talabarouter.put("/:id", updateStudent);
talabarouter.delete("/:id", deleteStudent);

export default talabarouter;
