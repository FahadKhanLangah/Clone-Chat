import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        isAuthUser: false,
        message: 'Please Login first'
      })
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        isAuthUser: false,
        message: 'Invalid Token'
      })
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        isAuthUser: false,
        message: 'User not found'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        isAuthUser: false,
        message: 'Session expired. Please log in again.'
      });
    }
    return res.status(500).json({
      isAuthUser: false,
      message: error.message
    })
  }
}