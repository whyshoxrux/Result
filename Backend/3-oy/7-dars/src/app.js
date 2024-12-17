import express from "express";
import getconfig from "./common/config/config.servic.js";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/user.controller.js";
import kafedraRouter from "./controller/kafedra.controller.js";
import index_formRouter from "./controller/index_forms.controller.js";
import index_informationRouter from "./controller/index_information.controller.js";
import notFoundRouter from "./common/middlewares/notFoundRouter.middleware.js";
import { emailJonatish } from "./common/service/mail.service.js";

const app = express();

const PORT = getconfig("EXPRESS_PORT") || 3000;

function initRoutes() {
  app.use("/user", userRouter);
  app.use("/kafedra", kafedraRouter);
  app.use("/index_forms", index_formRouter);
  app.use("/information", index_informationRouter);
}

async function init(req, res) {
  app.use(express.json());
  initRoutes();
  await initDatabase();
  app.use(notFoundRouter)
  app.use((err, req, res, next) => {
    console.log("Error: ", err.message);
  })
  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}

init();
