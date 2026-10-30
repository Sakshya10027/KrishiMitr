import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError } from '../utils/errors.js';
import { Role } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  fullName: string;
  role: Role;
  stateId: string | null;
  districtId: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new UnauthorizedError('Authentication token is missing. Please log in.'));
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Access token has expired. Please refresh your session.', [{ expired: true }]));
    }
    return next(new UnauthorizedError('Invalid access token.'));
  }
}

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.substring(7);
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    req.user = payload;
  } catch {
    // Ignore invalid tokens for optional authentication
  }
  next();
}
