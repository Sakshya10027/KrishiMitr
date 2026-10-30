import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service.js';
import { sendPaginated, sendSuccess } from '../../utils/apiResponse.js';
import { Role } from '@prisma/client';

const adminService = new AdminService();

export class AdminController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
      const role = req.query.role as Role | undefined;
      const search = req.query.search as string | undefined;

      const result = await adminService.getUsers(page, limit, role, search);
      return sendPaginated(res, result.users, result.pagination, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.body;
      const updated = await adminService.updateUserRole(
        req.params.id as string,
        role,
        req.user!.id,
        req.user!.role
      );
      return sendSuccess(res, updated, 'User role updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 25;

      const result = await adminService.getAuditLogs(page, limit);
      return sendPaginated(res, result.logs, result.pagination, 'Audit logs retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
