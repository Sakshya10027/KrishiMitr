import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { ForbiddenError, UnauthorizedError } from '../utils/errors.js';

export function authorizeRoles(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Access denied. Role "${req.user.role}" is not authorized for this operation.`));
    }

    next();
  };
}

export function enforceGeographicScope(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required.'));
  }

  // Central ADMIN has national scope
  if (req.user.role === Role.ADMIN) {
    return next();
  }

  // State Admin scope validation
  if (req.user.role === Role.STATE_ADMIN) {
    const requestedStateId = req.query.stateId || req.body.stateId || req.params.stateId;
    if (requestedStateId && requestedStateId !== req.user.stateId) {
      return next(new ForbiddenError('You are only authorized to access or modify records within your assigned State.'));
    }
  }

  // District Admin and Lab Operator scope validation
  if (req.user.role === Role.DISTRICT_ADMIN || req.user.role === Role.LAB_OPERATOR) {
    const requestedDistrictId = req.query.districtId || req.body.districtId || req.params.districtId;
    if (requestedDistrictId && requestedDistrictId !== req.user.districtId) {
      return next(new ForbiddenError('You are only authorized to access or modify records within your assigned District.'));
    }
  }

  next();
}
