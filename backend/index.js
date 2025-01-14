import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";

dotenv.config()
connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})