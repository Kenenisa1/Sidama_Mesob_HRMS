import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Isolate token from string array format
      token = req.headers.authorization.split(' ')[1];

      // Validate cryptographic payload signature
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

      // Hydrate request layer with absolute model records while screening credentials
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User record no longer exists' });
      }

      return next(); // CRITICAL: Stop block execution right here
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token present' });
  }
};