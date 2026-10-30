import { prisma } from '../../config/database.js';
import { LaboratoryType, Prisma } from '@prisma/client';
import { NotFoundError } from '../../utils/errors.js';
import { buildPaginationMeta } from '../../utils/pagination.js';

export class LaboratoriesService {
  async getLaboratories(filters: {
    stateId?: string;
    districtId?: string;
    stateName?: string;
    districtName?: string;
    laboratoryType?: LaboratoryType;
    search?: string;
    page: number;
    limit: number;
    activeOnly?: boolean;
  }) {
    const { stateId, districtId, stateName, districtName, laboratoryType, search, page, limit, activeOnly } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.LaboratoryWhereInput = {};

    if (activeOnly !== false) {
      where.isActive = true;
    }

    if (stateId) {
      where.stateId = stateId;
    } else if (stateName) {
      where.state = { name: { equals: stateName.trim(), mode: 'insensitive' } };
    }

    if (districtId) {
      where.districtId = districtId;
    } else if (districtName) {
      where.district = { name: { equals: districtName.trim(), mode: 'insensitive' } };
    }

    if (laboratoryType) {
      where.laboratoryType = laboratoryType;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { address: { contains: q, mode: 'insensitive' } },
        { postalCode: { contains: q } },
        { supportedParameters: { contains: q, mode: 'insensitive' } }
      ];
    }

    const [total, labs] = await Promise.all([
      prisma.laboratory.count({ where }),
      prisma.laboratory.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ name: 'asc' }],
        include: {
          state: { select: { id: true, name: true, code: true } },
          district: { select: { id: true, name: true, code: true } }
        }
      })
    ]);

    const pagination = buildPaginationMeta(total, page, limit);
    return { labs, pagination };
  }

  async getLaboratoryById(id: string) {
    const lab = await prisma.laboratory.findUnique({
      where: { id },
      include: {
        state: { select: { id: true, name: true, code: true } },
        district: { select: { id: true, name: true, code: true } }
      }
    });

    if (!lab) {
      throw new NotFoundError(`Soil Testing Laboratory with ID "${id}" was not found.`);
    }

    return lab;
  }

  async getNearbyLaboratories(lat: number, lng: number, radiusKm = 50, limit = 10) {
    // Retrieve labs that have geographic coordinates
    const labs = await prisma.laboratory.findMany({
      where: {
        isActive: true,
        latitude: { not: null },
        longitude: { not: null }
      },
      include: {
        state: { select: { id: true, name: true, code: true } },
        district: { select: { id: true, name: true, code: true } }
      }
    });

    // Haversine formula calculation
    const toRad = (value: number) => (value * Math.PI) / 180;
    const EARTH_RADIUS_KM = 6371;

    const labsWithDistance = labs.map(lab => {
      const dLat = toRad(lab.latitude! - lat);
      const dLng = toRad(lab.longitude! - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(lab.latitude!)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = Math.round(EARTH_RADIUS_KM * c * 10) / 10;

      return {
        ...lab,
        distanceKm
      };
    })
    .filter(lab => lab.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);

    return labsWithDistance;
  }

  async createLaboratory(data: Prisma.LaboratoryCreateInput) {
    return prisma.laboratory.create({
      data,
      include: {
        state: true,
        district: true
      }
    });
  }
}
