import { RedisStore } from "rate-limit-redis";
import { createClient } from "redis";

//redis client
const redisClient = createClient({
    url: process.env.REDIS_URL, disableOfflineQueue: true, //if redis get disconnected/down, provide res/error
})

//on error
redisClient.on("error", (err) => console.error("Redis error:", err))

//redis client connect
await redisClient.connect()

//handle to store counter with prefix 
export const makeStore = (prefix) => {
    new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: `r1:${prefix}:`
    })
}