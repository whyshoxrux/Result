import express from "express";
import { initDatabase } from "./common/databases/database.service.js";
import userRouter from "./common/controller/user.controller.js";

const app = express();

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection hatosi", err.message);
    logger.error(err.message);
});
process.on("uncaughtException", (err) => {
  console.log("uncaughtException xatosi ", err.message);  
})

function initRoutes() {
  app.use("/user", userRouter);
}

async function init() {
  app.use(express.json());

  await initDatabase();
  initRoutes();
  app.listen(3000, () => {
    console.log(`Server ${3000} da ishladi`);
  });
}
init();
