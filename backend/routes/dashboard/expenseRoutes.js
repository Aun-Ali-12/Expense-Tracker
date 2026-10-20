import express from "express"
import { middleware } from "../../middleware/middleware.js"
import { addExpenseController, deleteAllExpense, deleteOne, editExpense, fetchCategory, getData } from "../../controllers/dashboard/expenseController.js"
import { readLimiter, writeLimiter } from "../../utility/rateLimit.js"

const router = express.Router()

router.post("/expenses", middleware, writeLimiter, addExpenseController) //add expense
router.get("/expenses", middleware, readLimiter, getData) //fetch data
router.delete("/expenses/:id", middleware, writeLimiter, deleteOne) //delete single data
router.delete("/expenses/del/:id", middleware, writeLimiter, deleteAllExpense) //delete all
router.put("/expenses/:id", middleware, writeLimiter, editExpense) //edit expense
router.get("/expenses/cat", middleware, fetchCategory) //fetch category

export default router