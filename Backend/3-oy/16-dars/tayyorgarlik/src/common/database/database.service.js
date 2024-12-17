import setupModels from "./association.js";
import sequelize from "./sequelize.js";

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Bazaga ulandi");

    await setupModels();

    await sequelize.sync();
    console.log("Baza sinxronlashdi");
  } catch (err) {
    console.log("Bazada xatolik bo'ldi");
  }
}
