import sequelize from "./sequelize.js";
import setupModels from "./setupModels.js";

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Bazaga ulandi");

    await setupModels();

    await sequelize.sync();
    console.log("Baza sinxron boldi");
  } catch (err) {
    console.log("Bazaga ulanishda hatolik boldi", err.message);
  }
}
