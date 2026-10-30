import { Request, Response, NextFunction } from 'express';
import { AssistantService } from './assistant.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const assistantService = new AssistantService();

export class AssistantController {
  async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, conversationId, language } = req.body;
      const userId = req.user?.id;

      const result = await assistantService.chat(message, conversationId, userId, language);
      return sendSuccess(res, result, 'Message processed successfully');
    } catch (error) {
      next(error);
    }
  }

  async getConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const conv = await assistantService.getConversation(req.params.id as string);
      return sendSuccess(res, conv, 'Conversation history retrieved');
    } catch (error) {
      next(error);
    }
  }
}
