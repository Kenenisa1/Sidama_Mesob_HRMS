import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists in your root directory
  },
  filename: (req, file, cb) => {
    // Unique filename: FieldName-Timestamp.extension
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Check file type
const checkFileTypes = (file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: PDFs and Images Only!');
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2MB limit per file
  fileFilter: (req, file, cb) => {
    checkFileTypes(file, cb);
  }
});

export default upload;