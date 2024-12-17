import express from 'express'
import { getconfig } from './common/config/config.service.js';
import { initDatabase } from './common/database/database.service.js';
import userRouter from './controller/user.controller.js';
const app = express()
const PORT = getconfig("EXPRESS_PORT") || 3000;


function initRouter(){
    app.use("/user", userRouter)
}


async function init(){ 
    app.use(express.json())

    initRouter();
    await initDatabase();
    app.listen(PORT, () => {
        console.log(`Server ${PORT} da ishladi`);
        
    })
} 
init()