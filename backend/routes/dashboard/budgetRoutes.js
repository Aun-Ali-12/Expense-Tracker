import express from "express"
import { fetchBudget, insertBudget } from "../../controllers/dashboard/budgetController.js"
import { middleware } from "../../middleware/middleware.js"

const router = express.Router()

router.post("/budget", middleware, insertBudget)
router.get("/getbudget", middleware, fetchBudget)


export default router