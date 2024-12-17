import express from "express";
import getConfig from "./common/config/config.service.js";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { initDatabase } from "./common/database/database.service.js";
import studentRouter from "./controller/student.controller.js";
import { create } from "express-handlebars";
import path from "path";
import userRouter from "./controller/user.controller.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = getConfig("EXPRESS_PORT") || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = create({
  extname: ".handlebars",
  defaultLayout: "main",
});

function initRoutes() {
  app.use("/student", studentRouter);
  app.use("/user", userRouter);
}

async function init() {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.set("views", path.join(__dirname, "views"));

  initRoutes();

  await initDatabase();
  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}

init();
