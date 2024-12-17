import { Router } from "express";
import { authGuard } from "../common/guard/auth.guard.js";
import {
  renderTransfer,
  renderTransferConfirm,
  transfer,
  transferConfirm,
} from "../core/payment/payment.service.js";

const paymentRouter = Router();

paymentRouter.get("/transfer", authGuard, renderTransfer);
paymentRouter.get("/transfer-confirm", authGuard, renderTransferConfirm);
paymentRouter.post("/transfer", authGuard, transfer);
paymentRouter.post("/transfer-confirm", authGuard, transferConfirm)

export default paymentRouter