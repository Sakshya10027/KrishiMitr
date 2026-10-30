import { Router } from 'express';
import { AssistantController } from './assistant.controller.js';
import { optionalAuthenticate } from '../../middleware/authenticate.js';

const router = Router();
const controller = new AssistantController();

router.post('/chat', optionalAuthenticate, controller.chat);
router.get('/conversations/:id', optionalAuthenticate, controller.getConversation);

export default router;
