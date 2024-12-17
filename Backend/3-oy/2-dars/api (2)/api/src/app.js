import express from "express";
import getConfig from "./config/config.service.js";
import userRouter from "./controller/user.controller.js";
import productRouter from "./controller/product.controller.js";
import orderRouter from "./controller/order.controller.js";

const app = express();
const PORT = getConfig("EXPRESS_PORT") || 3000;

function initRoutes() {
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
}

async function init() {
  app.use(express.json());

  initRoutes();
  app.listen(PORT, () => console.log(`Server ${PORT} ishladi`));
}

init();
