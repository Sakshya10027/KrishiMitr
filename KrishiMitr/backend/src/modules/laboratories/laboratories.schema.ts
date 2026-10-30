import { z } from 'zod';
import { LaboratoryType } from '@prisma/client';

export const listLabsSchema = z.object({
  query: z.object({
    stateId: z.string().optional(),
    districtId: z.string().optional(),
    stateName: z.string().optional(),
    districtName: z.string().optional(),
    laboratoryType: z.nativeEnum(LaboratoryType).optional(),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    activeOnly: z.enum(['true', 'false']).optional().default('true')
  })
});

export const nearbyLabsSchema = z.object({
  query: z.object({
    lat: z.coerce.number().min(-90).max(90, 'Invalid latitude'),
    lng: z.coerce.number().min(-180).max(180, 'Invalid longitude'),
    radiusKm: z.coerce.number().min(1).max(500).default(50),
    limit: z.coerce.number().min(1).max(50).default(10)
  })
});

export const createLabSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    laboratoryType: z.nativeEnum(LaboratoryType),
    stateId: z.string(),
    districtId: z.string(),
    address: z.string().min(5),
    postalCode: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    operatingHours: z.string().optional(),
    accreditationStatus: z.string().optional(),
    supportedParameters: z.string().optional(),
    sampleCapacity: z.number().optional(),
    isActive: z.boolean().default(true)
  })
});
