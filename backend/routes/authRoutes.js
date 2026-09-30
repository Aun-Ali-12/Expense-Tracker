import express from "express";
import { login, signup, verifyEmail, forgotLink, updatePassword, resendVerification } from "../controllers/authController.js";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { makeStore } from "../utility/redisStore.js";

const router = express.Router();

const getClientIp = (req) => {
    const secret = req.headers["x-proxy-secret"];
    const clientIp = req.headers["x-client-ip"];
    const secretOk = !!secret && secret === process.env.PROXY_SECRET
    console.log("req.ip:", req.ip, "| x-client-ip:", clientIp, "| secretOk:", secretOk);

    //if secret matches, only then accept forwarded ip
    if (secretOk && clientIp) return clientIp
    return req.ip
}

// login limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => { ipKeyGenerator(getClientIp(req)) },
    store: makeStore("login"),
    passOnStoreError: true,
    message: 'Too many login attempts, try again later!',
});

//signup limiter
const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    standardHeaders: true,
    legacyHeaders: false,
    store: makeStore("signup-ip"),
    passOnStoreError: true,
    message: "You have reached your account creation limit, try again later!",
});

router.post("/signup", signupLimiter, signup);
router.post("/login", loginLimiter, login);
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotLink)
router.post("/reset-password", updatePassword)
router.post("/resend-verification", resendVerification)

export default router;
