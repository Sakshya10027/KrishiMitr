import { prisma } from '../../config/database.js';
import { ResourceCategory } from '@prisma/client';
import { NotFoundError } from '../../utils/errors.js';

export class ResourcesService {
  async getResources(category?: ResourceCategory, search?: string) {
    const where: any = { isActive: true };

    if (category) {
      where.category = category;
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } }
      ];
    }

    return prisma.resource.findMany({
      where,
      orderBy: { publicationDate: 'desc' }
    });
  }

  async getResourceById(id: string) {
    const resource = await prisma.resource.findUnique({
      where: { id }
    });

    if (!resource || !resource.isActive) {
      throw new NotFoundError(`Resource with ID "${id}" was not found.`);
    }

    return resource;
  }
}
