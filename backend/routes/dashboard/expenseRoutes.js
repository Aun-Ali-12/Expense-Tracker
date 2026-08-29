import express from "express"
import { middleware } from "../../middleware/middleware.js"
import { addExpenseController, deleteOne, getData } from "../../controllers/dashboard/expenseController.js"
const router = express.Router()

router.post("/expenses", middleware, addExpenseController)
router.get("/expenses/all", middleware, getData)
router.delete("/expenses/:id", middleware, deleteOne)


export default router