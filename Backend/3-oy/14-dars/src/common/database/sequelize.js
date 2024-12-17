import { Sequelize } from "sequelize";
import getConfig from "../config/config.service.js";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: getConfig("DATABASE_NAME"),
  username: getConfig("DATABASE_USER"),
  password: getConfig("DATABASE_PASSWORD"),
  host: getConfig("DATABASE_HOST"),
  port: parseInt(getConfig("DATABASE_PORT")),
});
export default sequelize;

