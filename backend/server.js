import express from "express";
import connectDB from "./db.js";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/authRoutes.js"
import expenseRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/dashboard/expenseRoutes.js"
import budgetRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/dashboard/budgetRoutes.js"
import userRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/dashboard/userRoutes.js"
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit"

config();
connectDB();
const app = express();
//auth limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many requests, try again!',
  standardHeaders: true,
  legacyHeaders: false,
});

//api limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, try again!',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cookieParser())
app.use(express.json()); //to parse request body in json
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
})); //to make request allowable from another ip



app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/dashboard", apiLimiter, expenseRoutes)
app.use("/api", apiLimiter, budgetRoutes)
app.use("/api", apiLimiter, userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
