import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import * as UserController from './customers.controller';

const router = Router();

router.use(authenticate);

router.get('/', authorize('admin'), UserController.getAll);

router.put('/:userId', UserController.update);

router.delete(
  '/:userId',
  authorize('admin'),
  UserController.remove
);

export default router;
