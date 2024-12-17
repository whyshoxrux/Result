import { Router } from "express";
import {
    updateBalance,
    getAllBalance,
} from "../core/balance/balance.service.js";

const balanceRouter = Router()

balanceRouter.put("/:id", updateBalance);
balanceRouter.get("/", getAllBalance);

export default balanceRouter;