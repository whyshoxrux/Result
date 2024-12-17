import express from "express";
import { connectDatabase } from "./common/database/database.service.js";
import getConfig from "./common/config/config.service.js";
import userController from "./controller/user.controller.js";

const app = express();

const PORT = getConfig("EXPRESS_PORT") || 3000;

function initRoutes() {
  app.use("/user", userController);
}

async function init() {
  app.use(express.json());

  await connectDatabase();
  initRoutes();

  app.listen(PORT, () => console.log(`Server ${PORT} ishladi`));
}

init();
