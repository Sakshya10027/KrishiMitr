import { Router } from 'express';
import { NutrientMapsController } from './nutrientMaps.controller.js';

const router = Router();
const controller = new NutrientMapsController();

router.get('/states', controller.getStateMap);
router.get('/parameters', controller.getParameters);

export default router;
