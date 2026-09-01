import express from "express";
import connectDB from "./db.js";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/authRoutes.js"
import expenseRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/dashboard/expenseRoutes.js"
import budgetRoutes from "/ExpenseTracker/Expense-Tracker/backend/routes/dashboard/budgetRoutes.js"

config();
connectDB();
const app = express();

app.use(express.json()); //to parse request body in json
app.use(cors()); //to make request allowable from frontend

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", expenseRoutes)
app.use("/api", budgetRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
