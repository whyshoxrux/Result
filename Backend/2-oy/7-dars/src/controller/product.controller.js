import { Router } from "express";
const router = Router();



router.post("/", addProduct);
router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
