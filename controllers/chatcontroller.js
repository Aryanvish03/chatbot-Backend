import axios from "axios";
import Chat from "../models/ChatModel.js";

const API_KEY = "AIzaSyCTdsddPvJ6a9PTjEp5dvboKnqmyrwoJtw"; // Replace with your actual key

// Handle chat requests
export const handleChat = async (req, res) => {
  try {
    const { userMessage } = req.body;

    // Fetch AI response from Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDmfNHEFMlZTGcp8Gb4OLh-EZOqTng_8M0`,
      { contents: [{ parts: [{ text: userMessage }] }] }
    );

    const botResponse = response.data.candidates[0].content.parts[0].text;

    // Save chat to PostgreSQL database
    await Chat.create({ userMessage, botResponse });

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

// Fetch chat history
export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await Chat.findAll({ order: [["id", "ASC"]] });
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Could not fetch chat history" });
  }
};
