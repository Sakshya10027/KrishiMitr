import { Router } from 'express';
import { FertilizerController } from './fertilizer.controller.js';
import { validate } from '../../middleware/validate.js';
import { recommendationSchema } from './fertilizer.schema.js';

const router = Router();
const controller = new FertilizerController();

router.post('/recommendations', validate(recommendationSchema), controller.calculate);

export default router;
