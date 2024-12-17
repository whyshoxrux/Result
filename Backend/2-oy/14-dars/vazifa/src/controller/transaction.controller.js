import { Router } from "express";
import {
    addTransaction,
    getAllTransaction,
    getTransaction
} from "../core/transaction/transaction.service.js";

const transactionRouter = Router()

transactionRouter.post("/", addTransaction);
transactionRouter.get("/", getAllTransaction);
transactionRouter.get("/:id", getTransaction);

export default transactionRouter;