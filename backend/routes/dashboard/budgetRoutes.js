import express from "express"
import { fetchBudget, insertBudget } from "../../controllers/dashboard/budgetController.js"
import { middleware } from "../../middleware/middleware.js"
import { readLimiter, writeLimiter } from "../../utility/rateLimit.js"

const router = express.Router()

router.post("/budget", middleware, writeLimiter, insertBudget)
router.get("/getbudget", middleware, readLimiter, fetchBudget)


export default router