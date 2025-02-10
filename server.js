import express from "express";
import cors from "cors";
import sequelize from "./DB/db.js";
import chatRoutes from "./routes/ChatRoutes.js"; // Import chat routes

const app = express();
app.use(cors());
app.use(express.json());

// Use chat routes
app.use("/api", chatRoutes);

// Sync database
sequelize.sync()
  .then(() => console.log("✅ Database connected & synced"))
  .catch(err => console.error("❌ Database sync error:", err));

// Set up the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
