import express from "express";
import { getconfig } from "./common/config/config.service.js";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/user.controller.js";
import sellerRouter from "./controller/seller.controller.js";
import productRouter from "./controller/products.controller.js";
import orderRouter from "./controller/orders.controller.js";
import joinRouter from "./controller/sellerVSusersjoin.controller.js";
import joinRouterr from "./controller/sellerVSproduct.controller.js";
import userVSorderRouter from "./controller/userVSorder.controller.js";
import productVSorder from "./controller/productVSorders.controller.js";

const app = express();

const PORT = getconfig("EXPRESS_PORT") || 3000;

function initRouter() {
  app.use("/user", userRouter);
  app.use("/seller", sellerRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
  app.use("/join", joinRouter)
  app.use("/joinn", joinRouterr)
  app.use("/userorderjoin", userVSorderRouter)
  app.use("/productVSorder", productVSorder)
}

async function init() {
  app.use(express.json());
  initRouter();
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`SERVER ${PORT} da ishladi`);
  });
}
init();
