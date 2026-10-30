import { prisma } from '../../config/database.js';

export class LocationsService {
  async getStates() {
    return prisma.state.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        type: true
      }
    });
  }

  async getDistricts(stateId?: string) {
    return prisma.district.findMany({
      where: stateId ? { stateId } : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        stateId: true
      }
    });
  }

  async getSubDistricts(districtId?: string) {
    return prisma.subDistrict.findMany({
      where: districtId ? { districtId } : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        districtId: true
      }
    });
  }

  async getVillages(subDistrictId?: string) {
    return prisma.village.findMany({
      where: subDistrictId ? { subDistrictId } : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        pincode: true,
        subDistrictId: true
      }
    });
  }
}
