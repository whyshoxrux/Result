import { log } from "console";
import express from "express";
import maxsulotlarRouter from "./controller/maxsulotlar.controller.js"
import userRouter from "./controller/users.controller.js"

const PORT = 3000;

const app = express();

app.use("/mahsulot", maxsulotlarRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server ${PORT} da ishladi`)
})
