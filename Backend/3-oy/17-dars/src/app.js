import express from 'express'
import getConfig from './common/config/config.service.js';
import { initDatabase } from './common/database/database.service.js';
import userRouter from './controller/user.controller.js';
import expressErrorHandling from './common/middlewares/express.errorhandling.js';
import notFoundRoutes from './common/middlewares/notFoundRoutes.js';
import { accessLogger, errorLogger } from './common/service/logger.service.js';

const app = express()

const PORT = getConfig("EXPRESS_PORT") || 3000;

process.on("uncaughtException", (err) => {
    errorLogger.error({type: "uncaughtException", message: err.message});
})
process.on("unhandledRejection", (err) => {
    errorLogger.error({type: "unhandledRejection", message: err.message});
})

function initRoutes(){
    app.use("/user", userRouter)
}

async function init(){
    app.use(express.json())

    app.use((req, res, next) => {
        const {url, method} =req;
        accessLogger.info({url, method});
        next()
    })

    initRoutes()

    app.use(notFoundRoutes)
    app.use(expressErrorHandling)

    await initDatabase()
    app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`))
}
init()