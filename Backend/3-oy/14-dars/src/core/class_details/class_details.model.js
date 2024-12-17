import { DataTypes } from "sequelize";
import sequelize from "../../common/database/sequelize.js";
import ClassModel from "../class/class.model.js";

const Class_detailsModel = sequelize.define("class_details", {
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule: {
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

export default Class_detailsModel


// Sinf tafsilotlari (ClassDetails) jadvali
// id: unikal identifikator (primary key, auto-increment)
// capacity: sinfning oâ€˜quvchilar sigâ€˜imi (maksimal oâ€˜quvchilar soni)
// schedule: dars jadvali (string koâ€˜rinishida)
// class_id: sinfning idsi (foreign key)