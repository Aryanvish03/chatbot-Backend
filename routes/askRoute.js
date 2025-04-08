// askroute.js
import express from "express";
import { Op } from "sequelize";
import axios from "axios";
import sequelize from "../DB/db.js";
import QA from "../models/QAModel.js";

const router = express.Router();

// Gemini API URL
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAGS4rBgJoONf5UBVBSAWwrZ2_kjeQPo8c`;

// Check DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Ask route
router.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "❌ Question is required" });
  }

  try {
    const trimmedQuestion = question.trim().toLowerCase();
    console.log("🔍 Searching for:", trimmedQuestion);

    const result = await QA.findOne({
      where: { question: { [Op.iLike]: trimmedQuestion } },
    });

    if (result) {
      console.log("✅ Found predefined answer:", result.answer);
      return res.json({ answer: result.answer });
    }

    console.log("🤖 No predefined answer found, calling Gemini API...");

    const geminiResponse = await axios.post(API_URL, {
      contents: [{ parts: [{ text: question }] }],
    });

    const geminiAnswer =
      geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I don't know the answer.";

    console.log("✅ Gemini response:", geminiAnswer);

    await QA.create({ question: trimmedQuestion, answer: geminiAnswer });

    return res.json({ answer: geminiAnswer });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
