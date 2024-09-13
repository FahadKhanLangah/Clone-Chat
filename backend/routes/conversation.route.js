import express from 'express'
import { isAuth } from '../middlewares/Auth.js';
import { createConversation, getConversation, getConversationDetail } from '../controller/conversation.controller.js';

const router = express.Router();

router.route('/create').post(isAuth, createConversation);
router.route('/get').get(isAuth, getConversation);
router.route('/detail/:id').get(isAuth, getConversationDetail);

export default router;