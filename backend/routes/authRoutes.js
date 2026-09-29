import express from "express";
import { login, signup, verifyEmail, forgotLink, updatePassword, resendVerification } from "../controllers/authController.js";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

const router = express.Router();

const getClientIp = (req) => {
    const secret = req.headers["x-proxy-secret"];
    const clientIp = req.headers["x-client-ip"];
    const secretOk = secret & secret === process.env.PROCESS_SECRET
    console.log("req.ip:", req.ip, "| x-client-ip:", clientIp, "| secretOk:", secretOk);

    //if secret matches, only then accept forwarded ip
    if (secretOk && clientIp) return clientIp
    return req.ip
}

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too many login attempts, try again later!',
    skipSuccessfulRequests: true,
    keyGenerator: (req) => { ipKeyGenerator(getClientIp(req)) }
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
