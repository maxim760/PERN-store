import Router from "express";
import TypeCtrl from "../controllers/TypeController.js";
import checkRoleMiddleware from "../middleware/CheckRoleMiddleware.js";

const router = new Router();

router.post("/",checkRoleMiddleware(["ADMIN"])   ,TypeCtrl.create);
router.get("/", TypeCtrl.getAll);

export default router;
