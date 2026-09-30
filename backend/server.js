import express from "express";
import connectDB from "./db.js";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import expenseRoutes from "./routes/dashboard/expenseRoutes.js"
import budgetRoutes from "./routes/dashboard/budgetRoutes.js"
import userRoutes from "./routes/dashboard/userRoutes.js"
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit"

config();
connectDB();
const app = express();
app.set("trust proxy", 1); // tells express to trust render's X-Forwarded-For header
app.use((req, res, next) => {
  console.log("| requestIp:", req.ip, "| trustproxy:", app.get("trust proxy"), "| xff:", req.headers["x-forwarded-for"]);
  next()
})

//  //api limiter
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests, try again!',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

app.use(cookieParser())
app.use(express.json()); //to parse request body in json
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
})); //to make request allowable from another ip



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
