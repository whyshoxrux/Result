import express from "express";
import getConfig from "./common/config/config.service.js";
import userRouter from "./controller/class.controller.js";
import { initDatabase } from "./common/database/database.service.js";


const app = express();

const PORT = getConfig("EXPRESS_PORT") || 3000;

function initRoutes() {
  app.use("/class", userRouter);
}
async function init() {
  app.use(express.json())
  initRoutes();

  await initDatabase();
  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}
init();
