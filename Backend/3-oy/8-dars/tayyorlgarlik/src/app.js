import express from 'express'
import { initDatabase } from './databases/database.service.js'
import userRouter from './common/controller/user.controller.js'

const app = express()

function initRoutes(){
    app.use("/user", userRouter)
} 

async function init(){
    app.use(express.json())
    await initDatabase()
    initRoutes();
    app.listen(3000, () => {
        console.log(`Server 3000 da ishladi`);
        
    })
}
init()
