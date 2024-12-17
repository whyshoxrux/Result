import { DataTypes } from "sequelize";
import sequelize from "../../common/database/sequelize.js";

const ClassModel = sequelize.define("classes", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacher_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default ClassModel;

// Sinflar (Classes) jadvali
// id: unikal identifikator (primary key, auto-increment)
// name: sinf nomi (masalan, "1-A", "2-B")
// teacher_name: sinf rahbari ismi