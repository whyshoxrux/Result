import { log } from "console";
import { Router } from "express";

const router = Router();

function maxsulotlarniOlish(req, res){
    console.log("Maxsulotlar olib tashlandi");
}

function maxsulotniOlish(req, res){
    console.log("Maxsulot olish ishladi");
}

function maxsulotQoshish(req, res){
    console.log("Maxsulot yangilash ishladi");
}

function maxsulotniOchirish(req, res){
    console.log("Maxsulotni ochirish ishladi");
}

function maxsulotniYangilash(req, res){
    console.log("Maxsulot yangilash ishladi");
}

router.get("/", maxsulotlarniOlish)
router.get("/:id", maxsulotniOlish)
router.post("/", maxsulotQoshish)
router.delete("/:id", maxsulotniOchirish)
router.put("/:id", maxsulotniYangilash)

export default router;