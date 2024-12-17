import dotenv from "dotenv";
import express from "express";
import productRouter from "./controller/product.controller.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/product", productRouter);
app.listen(PORT, () => {
  console.log(`Server ${PORT} da ishladi`);
});
