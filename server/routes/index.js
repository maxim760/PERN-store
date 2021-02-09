import Router from "express";

const router = new Router();

import userRouter from "./userRouter.js";
import deviceRouter from "./deviceRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);

export default router;
