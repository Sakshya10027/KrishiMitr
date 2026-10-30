import { Router } from 'express';
import { LaboratoriesController } from './laboratories.controller.js';
import { validate } from '../../middleware/validate.js';
import { listLabsSchema, nearbyLabsSchema } from './laboratories.schema.js';

const router = Router();
const controller = new LaboratoriesController();

router.get('/', validate(listLabsSchema), controller.getLaboratories);
router.get('/nearby', validate(nearbyLabsSchema), controller.getNearbyLaboratories);
router.get('/:id', controller.getLaboratoryById);

export default router;
