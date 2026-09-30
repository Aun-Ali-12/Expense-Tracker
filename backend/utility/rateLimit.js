import { makeStore } from "./redisStore";

//key generator
const userKey = (req) => req.user?.id?.toString() || makeKey(req);

//write limit
export const writeLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: userKey,
    store: makeStore("write"),
    passOnStoreError: true,
    message: { message: "Too many requests, please wait a minute." },
});

// Read routes
export const readLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: userKey,
    store: makeStore("read"),
    passOnStoreError: true,
    message: { message: "Too many requests, please wait a minute." },
});