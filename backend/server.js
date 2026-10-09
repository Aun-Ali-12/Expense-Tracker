import express from "express";
import connectDB from "./db.js";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import expenseRoutes from "./routes/dashboard/expenseRoutes.js"
import budgetRoutes from "./routes/dashboard/budgetRoutes.js"
import userRoutes from "./routes/dashboard/userRoutes.js"
import cookieParser from "cookie-parser";

config();
connectDB();
const app = express();
app.set("trust proxy", 3); // tells express to trust render's X-Forwarded-For header


app.use(cookieParser())
app.use(express.json()); //to parse request body in json
app.use(cors({
  origin: ["http://localhost:3000", process.env.FRONTEND_URL],
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/dashboard", expenseRoutes)
app.use("/api", budgetRoutes)
app.use("/api", userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
