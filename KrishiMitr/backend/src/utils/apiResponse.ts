import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function sendSuccess<T>(res: Response, data: T, message = 'Request completed successfully', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
}

export function sendPaginated<T>(res: Response, data: T[], pagination: PaginationMeta, message = 'Records retrieved successfully') {
  return res.status(200).json({
    success: true,
    data,
    pagination,
    message
  });
}

export function sendError(
  res: Response, 
  message: string, 
  code = 'INTERNAL_ERROR', 
  statusCode = 500, 
  details: unknown[] = []
) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details
    }
  });
}
