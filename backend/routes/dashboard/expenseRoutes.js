import express from "express"
import { middleware } from "../../middleware/middleware.js"
import { addExpenseController, deleteAllExpense, deleteOne, editExpense, getData } from "../../controllers/dashboard/expenseController.js"
const router = express.Router()

router.post("/expenses", middleware, addExpenseController) //add expense
router.get("/expenses/all", middleware, getData) //fetch data
router.delete("/expenses/:id", middleware, deleteOne) //delete single data
router.delete("/expenses/del/:id", middleware, deleteAllExpense) //delete all
router.put("/expenses/:id", middleware, editExpense) //edit expense


export default router