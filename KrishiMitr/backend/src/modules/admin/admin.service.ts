import { prisma } from '../../config/database.js';
import { Role } from '@prisma/client';
import { buildPaginationMeta } from '../../utils/pagination.js';

export class AdminService {
  async logAction(actorId: string | undefined, actorRole: string | undefined, action: string, entityType: string, entityId?: string, metadata?: any, ipAddress?: string) {
    return prisma.auditLog.create({
      data: {
        actorId,
        actorRole,
        action,
        entityType,
        entityId,
        metadata,
        ipAddress
      }
    });
  }

  async getUsers(page = 1, limit = 20, role?: Role, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { fullName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q } }
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          role: true,
          state: { select: { id: true, name: true } },
          district: { select: { id: true, name: true } },
          isActive: true,
          createdAt: true,
          lastLoginAt: true
        }
      })
    ]);

    const pagination = buildPaginationMeta(total, page, limit);
    return { users, pagination };
  }

  async updateUserRole(userId: string, newRole: Role, actorId: string, actorRole: string) {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true
      }
    });

    await this.logAction(actorId, actorRole, 'USER_ROLE_UPDATED', 'User', userId, {
      newRole,
      targetUser: updated.fullName
    });

    return updated;
  }

  async getAuditLogs(page = 1, limit = 25) {
    const skip = (page - 1) * limit;
    const [total, logs] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          actor: {
            select: { id: true, fullName: true, email: true, role: true }
          }
        }
      })
    ]);

    const pagination = buildPaginationMeta(total, page, limit);
    return { logs, pagination };
  }
}
