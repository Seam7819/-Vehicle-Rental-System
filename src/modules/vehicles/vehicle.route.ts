import { Router } from "express";
import * as controller from "./vehicle.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("admin"), controller.addVehicle);
router.get("/", controller.getVehicles);
router.get("/:vehicleId", controller.getVehicle);
router.put("/:vehicleId", authenticate, authorize("admin"), controller.updateVehicle);
router.delete("/:vehicleId", authenticate, authorize("admin"), controller.removeVehicle);

export default router;
