import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // RELATIONAL LINKS
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },

  // STEP 1: IDENTITY
  personalInfo: {
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    faydaId: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\d{16}$/, 'Please provide a valid 16-digit Fayda ID'] 
    },
    gender: { type: String, enum: ['Male', 'Female'], required: true }
  },

  // STEP 2: RESIDENCY
  residency: {
    woreda: { type: String, required: true },
    kebele: { type: String, required: true },
    address: { type: String }
  },

  // STEP 3: ACADEMIC PORTFOLIO
  education: {
    level: { 
      type: String, 
      enum: ['TVET/Diploma', 'Bachelor', 'Master', 'PhD'], 
      required: true 
    },
    institution: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    cgpa: { type: Number, required: true },
    graduationYear: { type: Number, required: true },
    experienceYears: { type: Number, default: 0 },
    skills: [String] // Array of skill tags
  },

  // STEP 4: DOCUMENT VAULT (Store Paths/URLs)
  documents: {
    degreeCertificate: { type: String, required: true }, 
    nationalIdCopy: { type: String, required: true },
    cv: { type: String }
  },

  // SYSTEM FIELDS
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  trackingId: {
    type: String,
    unique: true,
    default: () => `SMUC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
}, { timestamps: true });

// Exporting using ES Module syntax
const Application = mongoose.model('Application', ApplicationSchema);
export default Application;