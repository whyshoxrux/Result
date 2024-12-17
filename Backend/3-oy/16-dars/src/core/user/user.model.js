import { DataTypes } from "sequelize";
import sequelize from "../../common/database/sequelize.js";

const UserModel = sequelize.define("users", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  second_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 100000,
  },
  telegram_id: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});
export default UserModel;
