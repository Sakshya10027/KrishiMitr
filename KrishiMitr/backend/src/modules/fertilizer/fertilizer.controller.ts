import { Request, Response, NextFunction } from 'express';
import { FertilizerService } from './fertilizer.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const fertilizerService = new FertilizerService();

export class FertilizerController {
  calculate(req: Request, res: Response, next: NextFunction) {
    try {
      const { crop, area, soilTest } = req.body;
      const result = fertilizerService.calculateRecommendations(crop, area, soilTest);
      return sendSuccess(res, result, 'Fertilizer recommendations calculated successfully');
    } catch (error) {
      next(error);
    }
  }
}
