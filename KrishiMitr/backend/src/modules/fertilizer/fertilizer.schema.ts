import { z } from 'zod';

export const recommendationSchema = z.object({
  body: z.object({
    crop: z.string().min(2, 'Crop name is required'),
    area: z.object({
      value: z.number().positive('Area value must be greater than zero'),
      unit: z.enum(['hectare', 'acre', 'bigha']).default('hectare')
    }),
    soilTest: z.object({
      ph: z.number().min(3).max(11).optional().default(7.0),
      organicCarbon: z.number().min(0.01).max(5).optional().default(0.5),
      nitrogen: z.number().min(10).max(1000, 'Available Nitrogen must be between 10 and 1000 kg/ha'),
      phosphorus: z.number().min(0.5).max(300, 'Available Phosphorus must be between 0.5 and 300 kg/ha'),
      potassium: z.number().min(10).max(1000, 'Available Potassium must be between 10 and 1000 kg/ha'),
      sulphur: z.number().optional().default(12.0),
      zinc: z.number().optional().default(0.8)
    })
  })
});
