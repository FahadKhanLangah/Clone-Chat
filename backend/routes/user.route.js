import express from 'express'
import { getAllUsers, loginUser, loginUserDetail, logoutUser, registerUser } from '../controller/user.controller.js';
import upload from '../config/multer.js';
import { isAuth } from '../middlewares/Auth.js';


const router = express.Router();

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuth, loginUserDetail);
router.route('/logout').get(isAuth, logoutUser);
router.route('/all').get(isAuth, getAllUsers)

export default router;