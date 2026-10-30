import { z } from 'zod';
import { Role } from '@prisma/client';

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number').optional().or(z.literal('')),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.nativeEnum(Role).optional().default(Role.FARMER),
    stateId: z.string().optional(),
    districtId: z.string().optional(),
    preferredLanguage: z.string().optional().default('en'),
    designation: z.string().optional()
  }).refine(data => data.email || data.phone, {
    message: 'Either email or mobile number must be provided'
  })
});

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(3, 'Username, email or phone is required'),
    password: z.string().min(1, 'Password is required'),
    userType: z.string().optional()
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    identifier: z.string().min(3, 'Registered mobile number or email is required')
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    identifier: z.string().min(3, 'Registered mobile number or email is required'),
    otp: z.string().min(4, 'Valid OTP is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters')
  })
});

export const profileUpdateSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).optional(),
    preferredLanguage: z.string().optional(),
    stateId: z.string().optional(),
    districtId: z.string().optional()
  })
});
