import { DataTypes } from "sequelize";
import sequelize from "../../common/database/sequelize.js";
import ClassModel from "../class/class.model.js";

const studentModel = sequelize.define("students", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ClassModel,
            key: "id"
        }
    }
})
export default studentModel


// Oâ€˜quvchilar (Students) jadvali
//     id: unikal identifikator (primary key, auto-increment)
//     first_name: oâ€˜quvchining ismi
//     last_name: oâ€˜quvchining familiyasi
//     birthdate: tugâ€˜ilgan sanasi
//     class_id: sinfning idsi (foreign key)