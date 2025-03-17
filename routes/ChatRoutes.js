import express from "express";
import { handleChat, getChatHistory } from "../controllers/chatcontroller.js"; 

const router = express.Router();

// Route to handle chat requests
router.post("/chat", handleChat);

// Route to fetch chat history
router.get("/chat-history", getChatHistory);

export default router;