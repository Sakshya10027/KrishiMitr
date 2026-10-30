import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors.js';
import { requestLogger } from './middleware/requestLogger.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Module Routers
import authRouter from './modules/auth/auth.routes.js';
import locationsRouter from './modules/locations/locations.routes.js';
import laboratoriesRouter from './modules/laboratories/laboratories.routes.js';
import soilHealthCardRouter from './modules/soil-health-cards/soilHealthCard.routes.js';
import fertilizerRouter from './modules/fertilizer/fertilizer.routes.js';
import analyticsRouter from './modules/analytics/analytics.routes.js';
import nutrientMapsRouter from './modules/nutrient-maps/nutrientMaps.routes.js';
import resourcesRouter from './modules/resources/resources.routes.js';
import supportRouter from './modules/support/support.routes.js';
import assistantRouter from './modules/assistant/assistant.routes.js';
import adminRouter from './modules/admin/admin.routes.js';

export function createApp() {
  const app = express();

  // 1. Security & Core Middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Allows flexible PDF embeds and Vite dev hot reloads
    crossOriginEmbedderPolicy: false
  }));
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(cookieParser());
  app.use(requestLogger);
  app.use('/api', globalRateLimiter);

  // 2. Health & Readiness Check Endpoint
  const healthCheckHandler = (_req: express.Request, res: express.Response) => {
    res.status(200).json({
      status: 'UP',
      service: 'KrishiMitr National Soil Health Card Backend API',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
  };

  app.get('/health', healthCheckHandler);
  app.get('/api/v1/health', healthCheckHandler);

  // 3. API V1 Routes
  const v1 = express.Router();
  v1.use('/auth', authRouter);
  v1.use('/locations', locationsRouter);
  v1.use('/labs', laboratoriesRouter);
  v1.use('/soil-health-cards', soilHealthCardRouter);
  v1.use('/fertilizer', fertilizerRouter);
  v1.use('/analytics', analyticsRouter);
  v1.use('/nutrient-maps', nutrientMapsRouter);
  v1.use('/resources', resourcesRouter);
  v1.use('/support', supportRouter);
  v1.use('/assistant', assistantRouter);
  v1.use('/admin', adminRouter);

  app.use('/api/v1', v1);

  // 4. Centralized Not Found & Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
