import Router from "express";
import DeviceCtrl from "../controllers/DeviceController.js";
import checkRoleMiddleware from "../middleware/CheckRoleMiddleware.js";

const router = new Router();

router.post("/", checkRoleMiddleware(["ADMIN"]), DeviceCtrl.create);
router.get("/", DeviceCtrl.getAll);
router.get("/:id", DeviceCtrl.getOne);

export default router;
