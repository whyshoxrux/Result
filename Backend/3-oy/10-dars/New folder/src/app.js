import express from 'express'
import carsRouter from './controller/cars.controller.js';
import { getconfig } from './common/config/config.service.js';
import { accessLogger, errorLogger } from './common/service/logger.service.js';
import expressErrorHandling from './common/middleware/errorHandling.js';
const app = express()
const PORT = getconfig("EXPRESS_PORT") || 3000;


function initRouter(){
    app.use("/user", carsRouter)
}


async function init(){
    app.use(express.json())

    app.use((req, res, next) => {
        errorLogger.info("Chotki ishladi", {
            metadata: {
                url: req.url,
                method: req.method
            }
        })
        next()
    })
    initRouter();
    // await initDatabase();
    app.listen(PORT, () => {
        console.log(`Server ${PORT} da ishladi`);
        
    })
} 
init()