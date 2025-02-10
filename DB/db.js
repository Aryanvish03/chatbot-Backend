import { Sequelize } from "sequelize";

// PostgreSQL connection setup
const sequelize = new Sequelize("chatbot", "postgres", "12345678", {
  host: "localhost", 
  dialect: "postgres",
  port: 3333, 
  logging: false, // Set to true for debugging queries
});

export default sequelize;
