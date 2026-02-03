import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import * as VehicleController from './vehicle.controller';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin'),
  VehicleController.create
);

export default router;
