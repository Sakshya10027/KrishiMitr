import { Request, Response, NextFunction } from 'express';
import { LocationsService } from './locations.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const locationsService = new LocationsService();

export class LocationsController {
  async getStates(_req: Request, res: Response, next: NextFunction) {
    try {
      const states = await locationsService.getStates();
      return sendSuccess(res, states, 'States retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getDistricts(req: Request, res: Response, next: NextFunction) {
    try {
      const stateId = req.query.stateId as string | undefined;
      const districts = await locationsService.getDistricts(stateId);
      return sendSuccess(res, districts, 'Districts retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getSubDistricts(req: Request, res: Response, next: NextFunction) {
    try {
      const districtId = req.query.districtId as string | undefined;
      const subDistricts = await locationsService.getSubDistricts(districtId);
      return sendSuccess(res, subDistricts, 'Sub-districts retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getVillages(req: Request, res: Response, next: NextFunction) {
    try {
      const subDistrictId = req.query.subDistrictId as string | undefined;
      const villages = await locationsService.getVillages(subDistrictId);
      return sendSuccess(res, villages, 'Villages retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
