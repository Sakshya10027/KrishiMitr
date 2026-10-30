import { Router } from 'express';
import { AnalyticsController } from './analytics.controller.js';

const router = Router();
const controller = new AnalyticsController();

router.get('/overview', controller.getOverview);
router.get('/states', controller.getStateProgress);
router.get('/schools', controller.getSchoolMetrics);
router.get('/exports/csv', controller.exportCSV);

export default router;
