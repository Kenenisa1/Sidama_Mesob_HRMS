import express from 'express';
<<<<<<< HEAD
import {
  submitApplication,
  getMyApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus
} from '../controllers/applicationController.js';

// import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
=======
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { submitApplication, getMyApplication, getAllApplications } from '../controllers/applicationController.js';
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114

const router = express.Router();

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

const structuralUploadMap = upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'degreeCertificate', maxCount: 1 },
  { name: 'nationalIdCopy', maxCount: 1 },
  { name: 'otherCert', maxCount: 1 }
]);

// Route pipelines wrapped securely to capture file errors without dropping the socket stream
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

<<<<<<< HEAD
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
=======
// Standardized end-point pointers matching frontend configurations
router.get('/my-application', getMyApplication);
router.get('/all', getAllApplications);
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114

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