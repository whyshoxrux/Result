import express from "express";
import { getconfig } from "./common/config/config.service.js";
import { initDatabase } from "./common/databases/database.service.js";
import davomatRouter from "./controller/davomat.controller.js";
import talabarouter from "./controller/student.controller.js";

const app = express();
const PORT = getconfig("EXPRESS_PORT") || 3000;
function initRoutes() {
  app.use("/davomat", davomatRouter);
  app.use("/talaba", talabarouter);
}

async function init() {
  app.use(express.json());
  initRoutes();
  await initDatabase();
  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}
init();
