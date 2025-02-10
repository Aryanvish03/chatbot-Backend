import { DataTypes } from "sequelize";
import sequelize from "../DB/db.js";

const Chat = sequelize.define("Chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userMessage: { type: DataTypes.TEXT, allowNull: false },
  botResponse: { type: DataTypes.TEXT, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, 
});

export default Chat;
