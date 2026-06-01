import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import {
  submitApplication,
  getMyApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus
} from '../controllers/applicationController.js';

const router = express.Router();

// =========================================================
// MULTI-PART FILE SYSTEM CONFIGURATION (MULTER)
// =========================================================

// Ensure the local multi-part file directory path exists safely on initialization
const uploadDir = 'uploads/applications';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueToken = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedExt = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueToken}${sanitizedExt}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /pdf|png|jpg|jpeg/;
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  
  const extCheck = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeCheck = allowedMimeTypes.includes(file.mimetype);

  if (extCheck && mimeCheck) {
    cb(null, true);
  } else {
    cb(new Error('Security Policy Blocked Upload: Form accepts only valid .pdf, .jpg, or .png standard entries.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Enforce the 5MB file capacity limit
  fileFilter: fileFilter
});

// Structural layout map matching the fields expected from the frontend form submission
const structuralUploadMap = upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'degreeCertificate', maxCount: 1 },
  { name: 'nationalIdCopy', maxCount: 1 },
  { name: 'otherCert', maxCount: 1 }
]);

// =========================================================
// ROUTE IMPLEMENTATIONS
// =========================================================

/**
 * @route   POST /api/applications/submit
 * @desc    Submit professional credentials & multi-file form data
 * @access  Public
 */
router.post('/submit', (req, res, next) => {
  structuralUploadMap(req, res, (err) => {
    if (err) {
      console.error("❌ Multer Processing Error Intercepted:", err.message);
      return res.status(400).json({ 
        success: false, 
        message: `File upload processing failure: ${err.message}` 
      });
    }
    next();
  });
}, submitApplication);

/**
 * @route   GET /api/applications/my-status OR /api/applications/my-application
 * @desc    Check status of a specific candidate submission
 * @access  Public
 */
router.get('/my-status', getMyApplication);
router.get('/my-application', getMyApplication); // Alias fallback to match frontend api instances

/**
 * @route   GET /api/applications OR /api/applications/all
 * @desc    Get all system applications for the Admin management panel
 * @access  Public
 */
router.get('/', getAllApplications);
router.get('/all', getAllApplications); // Alias fallback to match frontend dashboards

/**
 * @route   GET /api/applications/:id
 * @desc    Get a detailed breakdown of a specific application by database ID
 * @access  Public
 */
router.get('/:id', getApplicationById);

/**
 * @route   PATCH /api/applications/:id/status
 * @desc    Update application status workflow state (Shortlist, Accept, Reject)
 * @access  Public
 */
router.patch('/:id/status', updateApplicationStatus);

export default router;