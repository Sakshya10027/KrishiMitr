import { Router } from 'express';
import { SoilHealthCardController } from './soilHealthCard.controller.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorizeRoles } from '../../middleware/authorize.js';
import { searchSHCSchema, createSHCSchema } from './soilHealthCard.schema.js';
import { Role } from '@prisma/client';

const router = Router();
const controller = new SoilHealthCardController();

router.post('/search', validate(searchSHCSchema), controller.searchCards);
router.get('/:id', controller.getCardById);
router.get('/:id/pdf', controller.getCardPDF);
router.post(
  '/',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.STATE_ADMIN, Role.DISTRICT_ADMIN, Role.LAB_OPERATOR),
  validate(createSHCSchema),
  controller.createCard
);

export default router;
