import { Router } from "express";
import * as controller from "./booking.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("admin", "customer"), controller.createBooking);
router.get("/", authenticate, controller.getBookings);
router.put("/:bookingId", authenticate, controller.cancelBooking);
router.put("/:bookingId/return", authenticate, authorize("admin"), controller.returnBooking);

export default router;
