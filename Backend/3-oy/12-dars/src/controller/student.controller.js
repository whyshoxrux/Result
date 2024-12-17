import { Router } from "express";
import {
  createStudentDormitory,
  deleteStudentDormitory,
  renderDormitory,
  renderDormitoryList,
} from "../core/student/student.service.js";

const studentRouter = Router();

studentRouter.get("/dormitory", renderDormitory);
studentRouter.get("/dormitory-list", renderDormitoryList);
studentRouter.post("/dormitory", createStudentDormitory);
studentRouter.delete("/dormitory/:id", deleteStudentDormitory);

export default studentRouter;
