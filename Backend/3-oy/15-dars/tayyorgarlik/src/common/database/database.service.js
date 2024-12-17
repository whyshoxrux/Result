import setupModels from "./associations.js";
import sequelize from "./sequelize.js";

export async function initDatabase(req, res) {
    try {
        await sequelize.authenticate();
        console.log("Bazaga ulandi");
        
        await setupModels();

        await sequelize.sync();
        console.log("Bazaga sinxronlashdi");
        
    } catch (err) {
        console.log("Bazada xatolik bo'ldi", err.message);
        
    }
}