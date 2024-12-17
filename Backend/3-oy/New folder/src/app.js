import express from 'express'
import getConfig from './common/config/config.service.js'
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/user.controller.js";
import expressErrorHandling from './common/middlewares/express.errorHandling.js';
import notFoundRoutes from './common/middlewares/notFoundRouter.js';
import { accessLogger, errorLogger } from "./common/service/logger.service.js";
import { fileURLToPath } from "url";
import path from "path";
import { create } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = getConfig("EXPRESS_PORT") || 3000;

process.on("uncaughtException", (err) => {
  errorLogger.error({ type: "uncaughtException", message: err.message });
});
process.on("unhandledRejection", (err) => {
  console.log(err);
  errorLogger.error({ type: "unhandledRejection", message: err.message });
});

const hbs = create({
  extname: ".handlebars",
  defaultLayout: "main",
});
function initRoutes() {
  app.use("/user", userRouter);
}
async function init() {
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.set("views", path.join(__dirname, "views"));

  app.use(express.json());

  app.use((req, res, next) => {
    const { url, method } = req;
    accessLogger.info({ url, method });
    next();
  });

  initRoutes();

  app.use(notFoundRoutes);
  app.use(expressErrorHandling);

  await initDatabase();

  app.listen(PORT, () => console.log(`Server ${PORT} ishladi`));
}

init();
