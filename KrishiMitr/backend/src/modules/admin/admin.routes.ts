import { Router } from 'express';
import { AdminController } from './admin.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorizeRoles } from '../../middleware/authorize.js';
import { Role } from '@prisma/client';

const router = Router();
const controller = new AdminController();

// Strictly restricted to central ADMIN role
router.use(authenticate, authorizeRoles(Role.ADMIN));

router.get('/users', controller.getUsers);
router.patch('/users/:id/role', controller.updateUserRole);
router.get('/audit-logs', controller.getAuditLogs);

export default router;
