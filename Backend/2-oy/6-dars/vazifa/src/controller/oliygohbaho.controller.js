import { Router } from "express";

const router = Router();

function baholarniOlish(req, res) {
  console.log("Baholarni olish ishladi");
}
function bahoQoshish(req, res) {
  console.log("Baho qoshish ishladi");
}
function bahoOlish(req, res) {
  console.log("Baho olish ishladi");
}
function bahoYangilash(req, res) {
  console.log("Baho yangilash ishladi");
}
function bahoOchirish(req, res) {
  console.log("Baho ochirish ishladi");
}

router.get("/", baholarniOlish);
router.get("/:id", bahoOlish);
router.post("/", bahoQoshish);
router.put("/:id", bahoYangilash);
router.delete("/:id", bahoOchirish);

export default router;
