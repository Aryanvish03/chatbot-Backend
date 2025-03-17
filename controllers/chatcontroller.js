import axios from "axios";
import {Chat} from "../models/ChatModel.js";
import dotenv from "dotenv";

dotenv.config();
console.log("gemini")
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAGS4rBgJoONf5UBVBSAWwrZ2_kjeQPo8c`;

const customQA = [
  { question: "What is your name", answer: "I am your AI assistant." },
  { question: "Who created you", answer: "I was created by Aryan Vishwakarma." },
  { question: "What is 2 + 2", answer: "2 + 2 is 4." },
  { question: "Who is the Director of RSAC", answer: "Shri Sheeldhar Singh Yadav." }
];

export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await Chat.findAll({ order: [["id", "ASC"]] });
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error.message);
    res.status(500).json({ error: "Could not fetch chat history" });
  }
};

export const handleChat = async (req, res) => {
  try {
    const { userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Normalize user message: Convert to lowercase & remove trailing "?"
    const normalizedUserMessage = userMessage.toLowerCase().replace(/\?$/, "");

    // Check if response exists in customQA
    const customResponse = customQA.find((qa) => qa.question.toLowerCase() === normalizedUserMessage);
    if (customResponse) {
      await Chat.create({ userMessage, botResponse: customResponse.answer });
      return res.json({ response: customResponse.answer });
    }

    // Fetch AI response from Gemini API
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: userMessage }] }]
    });

    const botResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "I'm not sure how to respond to that.";

    // Save chat to database
    await Chat.create({ userMessage, botResponse });

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error generating AI response:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};
