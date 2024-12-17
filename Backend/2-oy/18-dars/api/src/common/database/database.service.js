import mongoose from "mongoose";
import getConfig from "../config/config.service.js";

export async function connectDatabase(){
    try{
        const url = getConfig("MONGO_URL") + "/" + getConfig("MONGO_DB");

        await mongoose.connect(url)
        console.log("Bazaga ulandi");
        
    } catch(err){
        console.log("Bazaga ulanishda xatolik " + err.message);
        
    }
}