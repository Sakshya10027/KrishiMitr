import { Request, Response, NextFunction } from 'express';
import { LaboratoriesService } from './laboratories.service.js';
import { sendPaginated, sendSuccess } from '../../utils/apiResponse.js';
import { LaboratoryType } from '@prisma/client';

const laboratoriesService = new LaboratoriesService();

export class LaboratoriesController {
  async getLaboratories(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        stateId,
        districtId,
        stateName,
        districtName,
        laboratoryType,
        search,
        page,
        limit,
        activeOnly
      } = req.query;

      const result = await laboratoriesService.getLaboratories({
        stateId: stateId as string,
        districtId: districtId as string,
        stateName: stateName as string,
        districtName: districtName as string,
        laboratoryType: laboratoryType as LaboratoryType,
        search: search as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
        activeOnly: activeOnly === 'false' ? false : true
      });

      return sendPaginated(res, result.labs, result.pagination, 'Laboratories retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getLaboratoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const lab = await laboratoriesService.getLaboratoryById(req.params.id as string);
      return sendSuccess(res, lab, 'Laboratory details retrieved');
    } catch (error) {
      next(error);
    }
  }

  async getNearbyLaboratories(req: Request, res: Response, next: NextFunction) {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      const radiusKm = req.query.radiusKm ? parseFloat(req.query.radiusKm as string) : 50;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const nearbyLabs = await laboratoriesService.getNearbyLaboratories(lat, lng, radiusKm, limit);
      return sendSuccess(res, nearbyLabs, `Found ${nearbyLabs.length} laboratories within ${radiusKm} km radius`);
    } catch (error) {
      next(error);
    }
  }
}
