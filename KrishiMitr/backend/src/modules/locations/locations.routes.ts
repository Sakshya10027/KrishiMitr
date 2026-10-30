import { Router } from 'express';
import { LocationsController } from './locations.controller.js';

const router = Router();
const controller = new LocationsController();

router.get('/states', controller.getStates);
router.get('/districts', controller.getDistricts);
router.get('/sub-districts', controller.getSubDistricts);
router.get('/villages', controller.getVillages);

export default router;
