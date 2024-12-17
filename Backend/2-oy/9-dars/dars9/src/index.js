import express from "express";
import { getConfig } from "./common/config/config.service.js";
import { initDatabase } from "./common/database/database.service.js";
import projectRouter from "./controller/project.controller.js";

const app = express();
const PORT = getConfig("EXPRESS_PORT") || 3000;

function initRoutes() {
  app.use("/project", projectRouter);
}

async function init() {
  app.use(express.json());
  initRoutes();
  await initDatabase();
  app.listen(PORT, () => console.log(`Server is working on port ${PORT}`));
}
init();
