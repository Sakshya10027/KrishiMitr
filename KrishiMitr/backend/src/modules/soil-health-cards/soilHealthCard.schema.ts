import { z } from 'zod';
import { CardStatus } from '@prisma/client';

export const searchSHCSchema = z.object({
  body: z.object({
    queryType: z.enum(['phone', 'geo']),
    phoneNumber: z.string().optional(),
    farmerName: z.string().optional(),
    stateId: z.string().optional(),
    districtId: z.string().optional(),
    subDistrictId: z.string().optional(),
    villageId: z.string().optional(),
    stateName: z.string().optional(),
    districtName: z.string().optional()
  }).refine(data => {
    if (data.queryType === 'phone') {
      return !!data.phoneNumber && data.phoneNumber.replace(/\D/g, '').length >= 10;
    }
    return !!(data.stateId || data.stateName) || !!(data.farmerName && data.farmerName.length >= 2);
  }, {
    message: 'Valid phone number or state/farmerName required based on queryType'
  })
});

export const createSHCSchema = z.object({
  body: z.object({
    farmerName: z.string().min(2, 'Farmer name is required'),
    farmerPhone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit mobile number required').optional(),
    stateId: z.string(),
    districtId: z.string(),
    subDistrictId: z.string().optional(),
    villageId: z.string().optional(),
    khataNo: z.string().optional(),
    khasraNo: z.string().optional(),
    farmSizeHa: z.number().min(0.01).default(1.0),
    irrigationSource: z.string().default('Canal & Tubewell'),
    soilType: z.string().default('Alluvial Loam'),
    laboratoryId: z.string().optional(),
    cropSeason: z.string().default('Rabi 2025-26'),
    status: z.nativeEnum(CardStatus).default(CardStatus.ISSUED),
    testResults: z.object({
      pH: z.number().min(3.0).max(11.0),
      EC: z.number().min(0.0).max(20.0),
      OC: z.number().min(0.01).max(5.0),
      N: z.number().min(10).max(1000),
      P: z.number().min(0.5).max(200),
      K: z.number().min(10).max(1000),
      S: z.number().min(0.1).max(100),
      Zn: z.number().min(0.01).max(20),
      Fe: z.number().min(0.1).max(100),
      Cu: z.number().min(0.01).max(20),
      Mn: z.number().min(0.01).max(50),
      B: z.number().min(0.01).max(20)
    })
  })
});
