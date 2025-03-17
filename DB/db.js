import { Sequelize } from "sequelize";

// PostgreSQL connection setup
const sequelize = new Sequelize("FAQ", "postgres", "12345678", {
  host: "localhost", 
  dialect: "postgres",
  port: 3333, 
  logging: false, 
});

export default sequelize;
