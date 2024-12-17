import { Router } from "express";

const router = Router();

function oyinlarniOlish(req, res) {
  console.log("Oyinlarni olish ishladi");
}
function oyinOlish(req, res) {
  console.log("Oyinni olish ishladi");
}
function oyinQoshish(req, res) {
  console.log("Oyinni qoshish ishladi");
}
function oyinYangilash(req, res) {
  console.log("Oyinni yangilash ishladi");
}
function oyinOchirish(req, res) {
  console.log("Oyinni ochirish ishladi");
}

router.get("/", oyinlarniOlish)
router.get("/:id", oyinOlish)
router.post("/", oyinQoshish)
router.put("/:id", oyinYangilash)
router.delete("/:id", oyinOchirish)


export default router