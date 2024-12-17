import express from 'express'
import productRouter from './controller/products.controller.js';
import categoryRouter from './controller/category.controller.js';
import sellerRouter from './controller/sellers.controller.js';
import customerRouter from './controller/customers.controller.js';
import ordersRouter from './controller/orders.controller.js';
import { getconfig } from './common/config/config.service.js';
import { initDatabase } from './common/database/database.service.js';
const app = express()
const PORT = getconfig("EXPRESS_PORT") || 3000;


function initRouter(){
    app.use("/product", productRouter)
    app.use("/category", categoryRouter)
    app.use("/sellers", sellerRouter)
    app.use("/customers", customerRouter)
    app.use("/orders", ordersRouter)
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