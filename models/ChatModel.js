import { DataTypes } from "sequelize";
import sequelize from "../DB/db.js";

// Chat Model
const Chat = sequelize.define("Chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userMessage: { type: DataTypes.TEXT, allowNull: false },
  botResponse: { type: DataTypes.TEXT, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// QA Model
const QA = sequelize.define('qa_table', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.STRING },  // ⬅ Lowercase (matches DB)
  answer: { type: DataTypes.STRING }
}, { timestamps: false, tableName: 'qa_table' });

export { Chat, QA };  // Export both models
