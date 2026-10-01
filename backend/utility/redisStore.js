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
console.log("Redis PING:", await redisClient.ping());

//handle to store counter with prefix 
export const makeStore = (prefix) => {
    return new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: `rl:${prefix}:`
    })
}