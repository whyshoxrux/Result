import { DataTypes } from "sequelize";
import sequelize from "../../common/database/sequelize.js";

const UserModel = sequelize.define("user", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    second_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
    },
    balance: {
        type: DataTypes.STRING
    },
    telegram_id: {
        type: DataTypes.FLOAT
    }
})
export default UserModel