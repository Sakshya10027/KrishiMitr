import { Request, Response, NextFunction } from 'express';
import { NutrientMapsService } from './nutrientMaps.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const mapsService = new NutrientMapsService();

export class NutrientMapsController {
  getStateMap(req: Request, res: Response, next: NextFunction) {
    try {
      const cycle = (req.query.cycle as string) || 'Cycle-II';
      const mapData = mapsService.getStateNutrientMap(cycle);
      return sendSuccess(res, mapData, 'State nutrient fertility map data retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  getParameters(_req: Request, res: Response, next: NextFunction) {
    try {
      const params = mapsService.getNutrientParameters();
      return sendSuccess(res, params, 'Nutrient parameters metadata retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
