import mongoose from "mongoose";

const url = `mongodb://localhost:27017`;

async function connectToDb(){
    try{
        await mongoose.connect(url);
        console.log("Bazaga ulandi");
        
    } catch(err){
        console.log("Bazaga ulanishda xatolik boldi: " + err.message);
        
    }
}
connectToDb()