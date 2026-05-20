import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Ensure they actually have admin privileges
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Unauthorized role.' });
    }

    // 4. Generate JWT Token
    // Ensure JWT_SECRET is set in your .env file
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '2d' }
    );

    // 5. Send structural response matching your frontend needs
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};