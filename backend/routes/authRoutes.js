import express from 'express';
const router = express.Router();
import { adminLogin } from '../controllers/authController.js';

// @route   POST /api/auth/login
router.post('/login', adminLogin);

export default router;