import { Request, Response, NextFunction } from 'express';
import { ResourcesService } from './resources.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';
import { ResourceCategory } from '@prisma/client';

const resourcesService = new ResourcesService();

export class ResourcesController {
  async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as ResourceCategory | undefined;
      const search = req.query.search as string | undefined;

      const resources = await resourcesService.getResources(category, search);
      return sendSuccess(res, resources, 'Resources retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getResourceById(req: Request, res: Response, next: NextFunction) {
    try {
      const resource = await resourcesService.getResourceById(req.params.id as string);
      return sendSuccess(res, resource, 'Resource details retrieved');
    } catch (error) {
      next(error);
    }
  }
}
