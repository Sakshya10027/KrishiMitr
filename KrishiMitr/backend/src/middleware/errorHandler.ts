import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { sendError } from '../utils/apiResponse.js';
import { logger } from './requestLogger.js';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error({ err, path: req.path, method: req.method }, err.message);
    }
    return sendError(res, err.message, err.code, err.statusCode, err.details);
  }

  // Handle generic unexpected exceptions
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled Exception');
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected internal server error occurred.' 
    : err.message || 'Internal Server Error';

  return sendError(res, message, 'INTERNAL_SERVER_ERROR', 500);
}

export function notFoundHandler(req: Request, res: Response) {
  return sendError(res, `Cannot ${req.method} ${req.originalUrl} - Route not found`, 'ROUTE_NOT_FOUND', 404);
}
