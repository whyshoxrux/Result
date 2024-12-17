import { Router } from "express";

const router = Router();

function kinolarniOlish(req, res) {
  console.log("Kinolarni olish ishladi");
}
function kinoOlish(req, res) {
  console.log("Kino olish ishladi");
}
function kinoQoshish(req, res) {
  console.log("Kinoni qoshish ishladi");
}
function kinoYangilash(req, res) {
  console.log("Kino yangilash ishladi");
}
function kinoOchirish(req, res) {
  console.log("Kino ochirish ishladi");
}

router.get("/", kinolarniOlish);
router.get("/:id", kinoOlish);
router.post("/", kinoQoshish);
router.put("/:id", kinoYangilash);
router.delete("/:id", kinoOchirish);

export default router;
