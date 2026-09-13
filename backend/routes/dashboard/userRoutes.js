import express from "express"
import { middleware } from "../../middleware/middleware.js"
import { getUser } from "../../controllers/dashboard/userController.js"

const router = express.Router()
router.get("/user", middleware, getUser)

export default router