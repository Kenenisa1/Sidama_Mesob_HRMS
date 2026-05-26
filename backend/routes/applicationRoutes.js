import express from 'express';
import {
  submitApplication,
  getMyApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus
} from '../controllers/applicationController.js';

// import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * @description Document Vault Configuration
 * These keys MUST match the 'formData.append()' names in StepFour.jsx
 */
const vaultUploads = [
  { name: 'cv', maxCount: 1 },
  { name: 'degreeCertificate', maxCount: 1 },
  { name: 'nationalIdCopy', maxCount: 1 },
  { name: 'otherCert', maxCount: 1 } // Added to support your 'certFile' state
];

// --- PUBLIC ROUTES (Temporarily unprotected for testing) ---

/**
 * @route   POST /api/applications/submit
 * @desc    Submit professional credentials & form data
 * @access  Public (Will be Private once User model is ready)
 */
router.post(
  '/submit',
  upload.fields(vaultUploads),
  submitApplication
);

/**
 * @route   GET /api/applications/my-status
 * @desc    Check status of a specific application
 * @access  Public (Bypass protection for now)
 */
router.get('/my-status', getMyApplication);

/**
 * @route   GET /api/applications
 * @desc    Get all applications (Useful for your group project's Admin panel)
 */
router.get('/', getAllApplications);

/**
 * @route   GET /api/applications/:id
 * @desc    Get a specific application by ID
 * @access  Public
 */
router.get('/:id', getApplicationById);

/**
 * @route   PATCH /api/applications/:id/status
 * @desc    Update application status (Shortlist, Accept, Reject)
 * @access  Public
 */
router.patch('/:id/status', updateApplicationStatus);

export default router;