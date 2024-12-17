import setupModels from "./associations.js";
import sequelize from "./sequelize.js";

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Bazaga ulandi");

    await setupModels();

    await sequelize.sync();
    console.log("Baza sixronlashdi");
  } catch (err) {
    console.log("Bazada hatolik boldi", err.message);
  }
}
