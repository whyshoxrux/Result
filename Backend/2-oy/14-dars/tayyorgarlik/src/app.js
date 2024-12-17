import express from "express"
import { getconfig } from "./common/config.service.js"
import userRouter from "./controller/user.controller.js";
import transactionRouter from "./controller/transaction.controller.js";
import balanceRouter from "./controller/balance.controller.js";
import { initDatabase } from "./common/database/database.service.js";

const app = express()
const PORT = getconfig("EXPRESS_PORT") || 3000;

function initRoutes(){
    app.use("/user", userRouter)
    app.use("/transaction", transactionRouter)
    app.use("/balance", balanceRouter)
}

async function init(){
    app.use(express.json())

    initRoutes();
    await initDatabase();
    app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`))
}
init()
