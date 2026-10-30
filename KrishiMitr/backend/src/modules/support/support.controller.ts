import { Request, Response, NextFunction } from 'express';
import { SupportService } from './support.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const supportService = new SupportService();

export class SupportController {
  async createTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await supportService.createTicket({
        ...req.body,
        userId: req.user?.id
      });
      return sendSuccess(res, ticket, `Support Ticket ${ticket.ticketNumber} created successfully`, 201);
    } catch (error) {
      next(error);
    }
  }

  async getTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await supportService.getTicket(req.params.id as string);
      return sendSuccess(res, ticket, 'Ticket details retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const phone = req.query.phone as string | undefined;
      const status = req.query.status as any;
      const tickets = await supportService.getTickets({
        phone,
        userId: req.user?.id,
        status
      });
      return sendSuccess(res, tickets, 'Tickets retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const authorName = req.user?.fullName || 'User';
      const comment = await supportService.addComment(
        req.params.id as string,
        authorName,
        req.body.message,
        req.body.isInternal
      );
      return sendSuccess(res, comment, 'Comment posted successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const authorName = req.user?.fullName || 'Admin';
      const updated = await supportService.updateStatus(
        req.params.id as string,
        req.body.status,
        req.body.resolutionNote,
        authorName
      );
      return sendSuccess(res, updated, `Ticket status updated to ${req.body.status}`);
    } catch (error) {
      next(error);
    }
  }
}
