import { Router } from "express";
import {
  addTransaction,
  getAllTransaction,
  getTransaction,
} from "../core/transaction/transaction.service.js";

const transactionRouter = Router();

transactionRouter.post("/", addTransaction);
transactionRouter.post("/", getAllTransaction);
transactionRouter.post("/:id", getTransaction);


export default transactionRouter;