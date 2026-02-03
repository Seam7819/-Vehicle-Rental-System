import { Router } from "express";
import * as controller from "./customers.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", authenticate, authorize("admin"), controller.getAllUsers);
router.put("/:userId", authenticate, controller.updateUser);
router.delete("/:userId", authenticate, authorize("admin"), controller.removeUser);

export default router;
