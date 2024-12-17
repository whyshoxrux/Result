import ClassModel from "../../core/class/class.model.js";
import Class_detailsModel from "../../core/class_details/class_details.model.js";
import studentModel from "../../core/students/student.model.js";

export default function setupModels() {
    ClassModel.hasMany(studentModel, {foreignKey: "class_id"})
    // studentModel.belongsTo(ClassModel, {foreignKey: "class_id"})

    ClassModel.belongsTo(Class_detailsModel, {foreignKey: "class_id"})
    Class_detailsModel.belongsTo(ClassModel, {foreignKey: "class_id"})
}
