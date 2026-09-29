import express from "express";
import { login, signup, logout, verifyEmail, forgotLink, updatePassword, resendVerification } from "../controllers/authController.js";
import { middleware } from "../middleware/middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too many login attempts, try again later!',
    skipSuccessfulRequests: true
});

const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 25,
    message: "You have reached your account creation limit, try again later!"
});

router.post("/signup", signupLimiter, signup);
router.post("/login", loginLimiter, login);
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotLink)
router.post("/reset-password", updatePassword)
router.post("/resend-verification", resendVerification)

export default router;
