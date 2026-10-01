import express from "express"
import { fetchBudget, getBudget, insertBudget } from "../../controllers/dashboard/budgetController.js"
import { middleware } from "../../middleware/middleware.js"
import { readLimiter, writeLimiter } from "../../utility/rateLimit.js"

const router = express.Router()

router.post("/budget", middleware, writeLimiter, insertBudget)
router.get("/getbudget", middleware, readLimiter, fetchBudget)
router.get("/budget/all", middleware, readLimiter, getBudget)


export default router