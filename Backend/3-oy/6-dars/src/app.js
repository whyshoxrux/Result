import express from "express";
import getconfig from "./common/config/config.servic.js";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/user.controller.js";

const app = express();

const PORT = getconfig("EXPRESS_PORT") || 3000;

function initRoutes() {
  app.use("/user", userRouter);
}

function bodyy(req, res){
    let body = '';

  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    console.log(body);
  });
}

async function init(req, res) {
  
    app.use(bodyy)
  initRoutes();
  await initDatabase();
  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}

init();
