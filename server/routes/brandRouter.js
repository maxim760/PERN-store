import Router from "express"
import BrandCtrl from "../controllers/BrandController.js"
import checkRoleMiddleware from "../middleware/CheckRoleMiddleware.js"

const router = new Router()

router.post("/",checkRoleMiddleware(["ADMIN"]) ,BrandCtrl.create )
router.get("/", BrandCtrl.getAll )

export default router 