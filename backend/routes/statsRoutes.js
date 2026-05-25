import express from 'express';
const router = express.Router();
import { getPlatformStats } from '../controllers/statsController.js';

// @route   GET /api/stats/overview
router.get('/overview', getPlatformStats);

export default router;