import { Router } from 'express';
import { SupportController } from './support.controller.js';
import { validate } from '../../middleware/validate.js';
import { optionalAuthenticate, authenticate } from '../../middleware/authenticate.js';
import { authorizeRoles } from '../../middleware/authorize.js';
import { createTicketSchema, addCommentSchema, updateTicketStatusSchema } from './support.schema.js';
import { Role } from '@prisma/client';

const router = Router();
const controller = new SupportController();

router.post('/tickets', optionalAuthenticate, validate(createTicketSchema), controller.createTicket);
router.get('/tickets', optionalAuthenticate, controller.getTickets);
router.get('/tickets/:id', optionalAuthenticate, controller.getTicket);
router.post('/tickets/:id/comments', optionalAuthenticate, validate(addCommentSchema), controller.addComment);
router.patch(
  '/tickets/:id/status',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.STATE_ADMIN, Role.DISTRICT_ADMIN),
  validate(updateTicketStatusSchema),
  controller.updateStatus
);

export default router;
