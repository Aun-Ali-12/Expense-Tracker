import express from "express";
import { login, signup, verifyEmail, forgotLink, updatePassword, resendVerification } from "../controllers/authController.js";
import { rateLimit } from "express-rate-limit";
import { makeStore } from "../utility/redisStore.js";
import { makeKey } from "../utility/clientIp.js";

const router = express.Router();

// login limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: makeKey,
    store: makeStore("login"),
    passOnStoreError: true,
    message: 'Too many login attempts, try again later!',
});


//email limiter:
const loginEmailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        const email = req?.body?.email?.toLowerCase().trim()
        return email || makeKey(req) //return email || if body has already email run makeKey counter 
    },
    store: makeStore("login-email"),
    passOnStoreError: true
})


//signup limiter
const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: makeKey,
    store: makeStore("signup-ip"),
    passOnStoreError: true,
    message: "You have reached your account creation limit, try again later!",
});

//signup email limiter
const signupEmailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        const email = req.body?.email?.toLowerCase().trim();
        return email || makeKey(req);
    },
    store: makeStore("signup-email"),
    passOnStoreError: true,
});

router.post("/signup", signupLimiter, signupEmailLimiter, signup);
router.post("/login", loginLimiter, loginEmailLimiter, login);
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotLink)
router.post("/reset-password", updatePassword)
router.post("/resend-verification", resendVerification)

export default router;
