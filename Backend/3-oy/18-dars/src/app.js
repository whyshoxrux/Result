import express from "express";
import getConfig from "./common/config/config.service.js";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/user.controller.js";
import expressErrorHandling from "./common/middleware/express.errorhandling.js";
import notFoundRoutes from "./common/middleware/notFoundRoutes.js";
import { accessLogger, errorLogger } from "./common/service/logger.service.js";
import guidesRouter from "./controller/guides.controller.js";
import guide_typesRouter from "./controller/guide_types.controller.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {fileURLToPath} from "url"
import { create } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();


const PORT = getConfig("EXPRESS_PORT") || 3000;

process.on("uncaughtException", (err) => {
  errorLogger.error({ type: "uncaughtException", message: err.message });
});
process.on("unhandledRejection", (err) => {
  errorLogger.error({ type: "unhandledRejection", message: err.message });
});

function initRoutes() {
  app.use("/user", userRouter);
  app.use("/guide", guidesRouter)
  app.use("/type", guide_typesRouter)
}
async function init() {
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
