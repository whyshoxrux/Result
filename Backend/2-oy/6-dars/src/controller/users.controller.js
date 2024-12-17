import { log } from "console";
import { Router } from "express";

const router = Router();

function userlarniOlish(req, res){
    console.log("User olish ishladi");
}
function userOlish(req, res){
    console.log("User olish ishladi");
}
function userQoshish(req, res){
    console.log("User olish ishladi");
}
function userYangilash(req, res){
    console.log("User olish ishladi");
}
function userOchirish(req, res){
    console.log("User olish ishladi");
}


router.get("/", userlarniOlish);
router.get("/", userOlish);
router.get("/", userQoshish);
router.get("/", userYangilash);
router.get("/", userOchirish);

export default router