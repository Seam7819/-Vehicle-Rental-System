import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import * as BookingController from './booking.controller';

const router = Router();

router.use(authenticate);

router.post('/', BookingController.create);
router.get('/', BookingController.getAll);
router.put('/:bookingId', BookingController.updateStatus);

export default router;
