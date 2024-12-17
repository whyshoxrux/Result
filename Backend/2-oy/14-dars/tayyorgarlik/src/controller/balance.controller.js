import { Router } from "express";
import { getAllBalance, updatedBalance } from "../core/balance/balance.service.js";

const balanceRouter = Router()

balanceRouter.get("/", getAllBalance)
balanceRouter.get("/:id", updatedBalance)

export default balanceRouter