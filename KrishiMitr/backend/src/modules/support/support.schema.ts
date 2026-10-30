import { z } from 'zod';
import { TicketPriority, TicketStatus } from '@prisma/client';

export const createTicketSchema = z.object({
  body: z.object({
    farmerName: z.string().min(2, 'Name is required'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit mobile number required'),
    category: z.string().min(3, 'Category is required'),
    description: z.string().min(5, 'Please provide a detailed description'),
    priority: z.nativeEnum(TicketPriority).optional().default(TicketPriority.MEDIUM)
  })
});

export const addCommentSchema = z.object({
  body: z.object({
    message: z.string().min(1, 'Message cannot be empty'),
    isInternal: z.boolean().optional().default(false)
  })
});

export const updateTicketStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(TicketStatus),
    resolutionNote: z.string().optional()
  })
});
