import express from 'express';
import { getMessage, sendMessage } from '../controller/message.controller.js';
import { isAuth } from '../middlewares/Auth.js'
import { getLastMessage, setLastMessage } from '../controller/conversation.controller.js';

const router = express.Router();

router.route('/send/:id').post(isAuth,sendMessage);
router.route('/get/:id').get(isAuth,getMessage);
router.route("/setLastMessage").post(isAuth,setLastMessage);
router.route("/getLastMessage").post(isAuth,getLastMessage)

export default router 