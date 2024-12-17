import express from "express";
import { initDatabase } from "./databases/database.service.js";
import userRouter from "./controller/user.controller.js";

const app = express();
const PORT = 4000;

function initRoutes(){
app.use("/user", userRouter);
}

async function init(){
    app.use(express.json());
    initRoutes();
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server ${PORT} da ishladi`);
    });
    
}

init()
