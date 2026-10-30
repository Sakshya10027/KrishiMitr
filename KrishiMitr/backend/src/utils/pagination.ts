import { Request } from 'express';
import { PaginationMeta } from './apiResponse.js';

export interface PaginationQuery {
  page: number;
  limit: number;
  skip: number;
}

export function parsePagination(req: Request, defaultLimit = 20, maxLimit = 100): PaginationQuery {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const requestedLimit = parseInt(req.query.limit as string, 10) || defaultLimit;
  const limit = Math.min(Math.max(1, requestedLimit), maxLimit);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1
  };
}
