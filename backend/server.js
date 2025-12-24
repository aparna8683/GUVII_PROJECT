import dotenv from "dotenv";
import express from 'express'
const app=express()
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js'
import { protect } from './middlewares/authMiddleware.js';
import { generateInterviewQuestions, generateConceptExplanation } from './controllers/aiController.js';

import questionRoutes from './routes/questionRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'

import connectDB from "./config/db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

 
app.use(cors({
      origin: "*", // your frontend URL

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
connectDB()

// Routes
app.get("/",(req, res)=>{
 res.send("Server is running")
}
        
 )
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
