import { Router } from "express";
import {
  createStudentDormitory,
  renderDormitory,
  renderDormitoryList,
} from "../core/student.service.js";
import authguard from "../common/guard/auth.guard.js";

const studentRouter = Router();

studentRouter.get("/dormitory", renderDormitory);
studentRouter.get("/dormitory-list", authguard, renderDormitoryList);
studentRouter.post("/dormitory", createStudentDormitory);

export default studentRouter