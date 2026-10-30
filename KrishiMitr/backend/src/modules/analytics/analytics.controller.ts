import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  async getOverview(_req: Request, res: Response, next: NextFunction) {
    try {
      const overview = await analyticsService.getOverview();
      return sendSuccess(res, overview, 'National overview metrics retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getStateProgress(_req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await analyticsService.getStateProgress();
      return sendSuccess(res, progress, 'State-wise progress records retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getSchoolMetrics(_req: Request, res: Response, next: NextFunction) {
    try {
      const schoolStats = await analyticsService.getSchoolMetrics();
      return sendSuccess(res, schoolStats, 'School Soil Health metrics retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async exportCSV(req: Request, res: Response, next: NextFunction) {
    try {
      const cycle = (req.query.cycle as string) || 'cycle2';
      const csv = await analyticsService.exportCSV(cycle);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="SoilHealth_State_Progress_${cycle}.csv"`);
      return res.status(200).send(csv);
    } catch (error) {
      next(error);
    }
  }
}
