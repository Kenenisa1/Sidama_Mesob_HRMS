import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // RELATIONAL DATA STREAMS
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User tracking link is mandatory']
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Targeted position vacancy association is mandatory']
  },

  // STEP 1: IDENTITY CREDENTIALS
  personalInfo: {
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid structural operational email address']
    },
    phone: { 
      type: String, 
      required: true,
      trim: true
    },
    faydaId: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      match: [/^\d{16}$/, 'National Digital Fayda ID must contain precisely 16 metric digits'] 
    },
    gender: { type: String, enum: ['Male', 'Female'], required: true }
  },

  // STEP 2: RESIDENCY CONTEXT (Enforcing regional parameters within Sidama)
  residency: {
    woreda: { type: String, required: true, trim: true },
    kebele: { type: String, required: true, trim: true },
    houseNumber: { type: String, trim: true, default: 'New/Unassigned' }
  },

  // STEP 3: ACADEMIC & PROFESSIONAL PORTFOLIO
  education: {
    level: { 
      type: String, 
      enum: ['TVET/Diploma', 'Bachelor', 'Master', 'PhD'], 
      required: true 
    },
    institution: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, required: true, trim: true },
    cgpa: { type: Number, required: true, min: 0, max: 4.0 },
    graduationYear: { type: Number, required: true },
    experienceYears: { type: Number, default: 0, min: 0 },
    sidaamuAfooProficiency: {
      type: String,
      enum: ['BASIC', 'INTERMEDIATE', 'FLUENT', 'NATIVE'],
      required: true,
      set: v => v.toUpperCase() // Safely normalizes casing from client buttons
    }
  },

  // STEP 4: DOCUMENT VAULT SECURE STORAGE POINTERS
  documents: {
    cv: { type: String, required: true },
    degreeCertificate: { type: String, required: true }, 
    nationalIdCopy: { type: String, required: true },
    otherCertificate: { type: String, default: null }
  },

  // STRUCTURAL WORKFLOW TRACKING STATE
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  trackingId: {
    type: String,
    unique: true,
    default: () => `SMUC-${Math.random().toString(36).substring(2, 11).toUpperCase()}`
  }
}, { timestamps: true });

// Optimize lookups based on relational query patterns
ApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;