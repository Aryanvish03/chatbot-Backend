// QAmodel.js
import { DataTypes } from "sequelize";
import sequelize from "../DB/db.js";

const QA = sequelize.define(
  "qa_table",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question: { type: DataTypes.STRING },
    answer: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: "qa_table",
  }
);

export default QA;
