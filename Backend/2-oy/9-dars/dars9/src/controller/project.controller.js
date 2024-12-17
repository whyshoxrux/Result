import { Router } from "express";

import {
  insertProject,
  selectProjects,
  updateProject,
  deleteProject,
} from "../core/projects/projects.service.js";

const router = Router();

router.post("/", insertProject);
router.get("/:id", selectProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
