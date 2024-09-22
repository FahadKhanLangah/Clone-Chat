import express from 'express'
import { getAllUsers, getOtherUsers, loginUser, loginUserDetail, logoutUser, registerUser, updateUser } from '../controller/user.controller.js';
import upload from '../config/multer.js';
import { isAuth } from '../middlewares/Auth.js';


const router = express.Router();

router.route('/register').post(upload.single('avatar'), registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuth, loginUserDetail);
router.route('/logout').get(isAuth, logoutUser);
router.route('/all').get(isAuth, getAllUsers);
router.route('/other').get(isAuth, getOtherUsers);
router.route('/update/me').put(isAuth, upload.single('newAvatar'),updateUser);

export default router;