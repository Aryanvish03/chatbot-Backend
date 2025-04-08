// db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("FAQ", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
  port: 3333,
  logging: false,
});

export default sequelize;
