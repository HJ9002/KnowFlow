import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDatabase } from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "An unexpected server error occurred." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`KnowFlow server running on port ${port}.`));
connectDatabase().then((connected) => {
  if (!connected) console.warn("MongoDB is not configured. Temporary in-memory storage is active; data will be lost when the server stops.");
}).catch((error) => {
  console.warn(`MongoDB connection failed (${error.message}). Temporary in-memory storage is active; data will be lost when the server stops.`);
});
