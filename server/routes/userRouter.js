import Router from "express"
import UserCtrl from "../controllers/UserController.js"
import { registrationValidator } from "../validator/registrationValidator.js"
import authMiddleware from "../middleware/AuthMiddleware.js"

const router = new Router()

router.post("/registration", registrationValidator ,UserCtrl.registration)
router.post("/login", UserCtrl.login )
router.get("/auth",authMiddleware, UserCtrl.check )

export default router 