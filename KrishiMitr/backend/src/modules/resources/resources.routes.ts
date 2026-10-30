import { Router } from 'express';
import { ResourcesController } from './resources.controller.js';

const router = Router();
const controller = new ResourcesController();

router.get('/', controller.getResources);
router.get('/:id', controller.getResourceById);

export default router;
