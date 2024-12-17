import { DataTypes } from "sequelize";
import sequelize from "../../common/database/sequelize.js";

const UserModel = sequelize.define("users", {
    first_name: {
        type: DataTypes.STRING
    },
    second_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    balance: {
        type: DataTypes.FLOAT
    },
    telegram_id: {
        type: DataTypes.FLOAT
    },
})
export default UserModel