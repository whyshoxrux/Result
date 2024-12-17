import { Router } from "express";

const router = Router()

function kitoblarniOlish(req, res){
    console.log("Kitoblarni olish ishladi");
}
function kitobniOlish(req, res){
    console.log("Kitobni olish ishladi");
}
function kitobQoshish(req, res){
    console.log("Kitobni qoshish ishladi");
}
function kitobYangilash(req, res){
    console.log("Kitobni yangilash ishladi");
}
function kitobOchirish(req, res){
    console.log("Kitobni o'chirish ishladi");
}

router.get("/", kitoblarniOlish)
router.get("/:id", kitobniOlish)
router.post("/", kitobQoshish)
router.put("/:id", kitobYangilash)
router.delete("/:id", kitobOchirish)


export default router;