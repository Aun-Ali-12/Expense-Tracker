import express from "express";
import { login, signup, logout } from "../controllers/authController.js";
import { middleware } from "../middleware/middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", middleware, logout);

export default router;
