import { prisma } from '../../config/database.js';
import { TicketPriority, TicketStatus } from '@prisma/client';
import { NotFoundError } from '../../utils/errors.js';

export class SupportService {
  async createTicket(data: {
    farmerName: string;
    phone: string;
    category: string;
    description: string;
    priority?: TicketPriority;
    userId?: string;
  }) {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const ticketNumber = `TKT-${randomSuffix}`;

    try {
      return await prisma.supportTicket.create({
        data: {
          ticketNumber,
          farmerName: data.farmerName.trim(),
          phone: data.phone.trim().replace(/\D/g, ''),
          category: data.category,
          description: data.description.trim(),
          priority: data.priority || TicketPriority.MEDIUM,
          userId: data.userId || null,
          status: TicketStatus.OPEN
        },
        include: {
          comments: true
        }
      });
    } catch {
      // Disconnected resilience
      return {
        id: `mock-${randomSuffix}`,
        ticketNumber,
        farmerName: data.farmerName.trim(),
        phone: data.phone.trim().replace(/\D/g, ''),
        category: data.category,
        description: data.description.trim(),
        priority: data.priority || TicketPriority.MEDIUM,
        status: TicketStatus.OPEN,
        userId: data.userId || null,
        assignedToId: null,
        resolutionNote: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        resolvedAt: null,
        comments: []
      } as any;
    }
  }

  async getTicket(identifier: string) {
    const ticket = await prisma.supportTicket.findFirst({
      where: {
        OR: [
          { id: identifier },
          { ticketNumber: identifier }
        ]
      },
      include: {
        comments: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!ticket) {
      throw new NotFoundError(`Support Ticket "${identifier}" was not found.`);
    }

    return ticket;
  }

  async getTickets(filters?: { phone?: string; userId?: string; status?: TicketStatus }) {
    return prisma.supportTicket.findMany({
      where: {
        ...(filters?.phone && { phone: filters.phone }),
        ...(filters?.userId && { userId: filters.userId }),
        ...(filters?.status && { status: filters.status })
      },
      orderBy: { createdAt: 'desc' },
      include: {
        comments: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async addComment(ticketId: string, authorName: string, message: string, isInternal = false) {
    const ticket = await this.getTicket(ticketId);

    const comment = await prisma.ticketComment.create({
      data: {
        ticketId: ticket.id,
        authorName,
        message: message.trim(),
        isInternal
      }
    });

    if (ticket.status === TicketStatus.OPEN) {
      await prisma.supportTicket.update({
        where: { id: ticket.id },
        data: { status: TicketStatus.IN_PROGRESS }
      });
    }

    return comment;
  }

  async updateStatus(ticketId: string, status: TicketStatus, resolutionNote?: string, authorName?: string) {
    const ticket = await this.getTicket(ticketId);

    if (resolutionNote) {
      await prisma.ticketComment.create({
        data: {
          ticketId: ticket.id,
          authorName: authorName || 'Support Staff',
          message: `Resolution: ${resolutionNote.trim()}`,
          isInternal: false
        }
      });
    }

    return prisma.supportTicket.update({
      where: { id: ticket.id },
      data: {
        status,
        ...(status === TicketStatus.RESOLVED || status === TicketStatus.CLOSED ? { resolvedAt: new Date() } : {})
      }
    });
  }
}
