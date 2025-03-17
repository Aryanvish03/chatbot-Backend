 import express from 'express';
import { Sequelize, DataTypes, Op } from 'sequelize';
import axios from 'axios';
import { handleChat, getChatHistory } from "../controllers/chatcontroller.js";

const router = express.Router();
const sequelize = new Sequelize("FAQ", "postgres", "12345678", {
    host: "localhost", 
    dialect: "postgres",
    port: 3333, 
    logging: false, 
});

const Gemini_API_KEY = process.env.GEMINI_API_KEY;

// Define the QA table model
const QA = sequelize.define('qa_table', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.STRING },
  answer: { type: DataTypes.STRING }
}, { timestamps: false, tableName: 'qa_table' });

// Check DB connection
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

router.post('/ask', async (req, res) => {
  const { question } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Trim question and log it
    const trimmedQuestion = question.trim();
    console.log('Searching for question:', trimmedQuestion);

    const result = await QA.findOne({
      where: { question: { [Op.iLike]: trimmedQuestion } }
    });
    
    // Log the database result
    console.log('Database result:', result);

    if (result) {
      // Return the predefined answer
      return res.json({ answer: result.answer });
    } else {
      // Call Gemini API for unmatched questions
      // const geminiResponse = await axios.post(
      //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAGS4rBgJoONf5UBVBSAWwrZ2_kjeQPo8c`,
      //   { contents: [{ parts: [{ text: question }] }] }
      // );
      
      // const geminiAnswer = geminiResponse.data.candidates[0].content.parts[0].text;

      // // Save the new question and answer into the database
      // await QA.create({ Question: trimmedQuestion, Answer: geminiAnswer });
      // console.log('New QA added to the database:', trimmedQuestion, geminiAnswer);
      
      // return res.json({ answer: geminiAnswer });

      router.post("/chat", handleChat);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
});

export default router;