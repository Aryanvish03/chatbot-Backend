import express from "express";
import cors from "cors";
import sequelize from "./DB/db.js";
import askRoute from './routes/askRoute.js';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api", askRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
