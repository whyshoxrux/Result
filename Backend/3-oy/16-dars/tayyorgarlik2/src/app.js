import express from "express";
import { fileURLToPath } from "url";
import getConfig from "./common/config/config.service.js";
import { create } from "express-handlebars";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import initDatabase from "./common/database/database.service.js";
import { listenBot } from "./common/service/service.js";
import userRouter from "./controller/user.controller.js";
import paymentRouter from "./controller/payment.controller.js";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()

const PORT = getConfig("EXPRESS_PORT") || 3000;

const hbs = create({
    extname: ".handlebars",
    defaultLayout: "main",
})

function initRoutes(){
    app.use("/user", userRouter)
    app.use("/payment", paymentRouter)
}

async function init(){
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json())

    app.engine("handlebars", hbs.engine);
    app.set("view engine", "handlebars");

    app.set("views", path.join(__dirname, "views"));

    listenBot()
    initRoutes();
    await initDatabase()

    app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`))
}
init()