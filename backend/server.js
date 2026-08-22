import express from "express";
import connectDB from "./db.js";
import { config } from "dotenv";
config()
connectDB()
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:3000");
});
