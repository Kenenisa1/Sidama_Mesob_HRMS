import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    }, // e.g., "የሲስተም አድሚኒስትሬተር IV"
    
    jobCode: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    }, // e.g., "ሲዳ/መሶብ-1.2.18-012"
    
    department: { 
      type: String, 
      required: true,
      // Fixed organizational units from the Mesob structure
      enum: [
        "Human Resource Development Directorate",
        "Planning & Budgeting",
        "Public Relations",
        "Technical Services",
        "Information Technology"
      ]
    },
    
    rankLevel: { 
      type: String, 
      required: true 
    }, // e.g., "Level XIV", "Level VII" (Crucial for civil service rank matching)
    
    salary: { 
      type: Number, 
      required: true 
    }, // Storing as a number allows strict administrative budget filtering
    
    positions: { 
      type: Number, 
      required: true, 
      min: [1, "Number of positions must be at least 1"], 
      default: 1 
    }, // Number of open seats
    
    description: {
      type: String,
      required: true,
      trim: true
    }, // General description of the civil service posting

    requirements: {
      type: String,
      required: true,
      trim: true
    }, // Broad operational responsibilities 
    
    eligibleFields: { 
      type: String, 
      required: true 
    }, // e.g., "Computer Science, Software Engineering, IT..."
    
    experienceRequirements: { 
      type: String, 
      required: true 
    }, // e.g., "6 Years of experience in database administration"
    
    cgpa: {
      type: Number,
      required: true,
      default: 0
    }, // Numeric assignment to allow automatic cutoff evaluations in submission gateways
    
    requiresCOC: { 
      type: Boolean, 
      default: false 
    }, // Certificate of Competency mandatory verification flag
    
    // Multilingual support requested by the bureau layout
    languages: {
      sidama: { type: Boolean, default: true },
      amharic: { type: Boolean, default: true },
      english: { type: Boolean, default: false }
    },
    
    registrationWindowDays: { 
      type: Number, 
      required: true, 
      enum: [5, 10], 
      default: 10 
    }, // Level VII gets 5 days; Level VIII and above get 10 days per regional guidelines
    
    deadline: { 
      type: Date, 
      required: true 
    },
    
    location: { 
      type: String, 
      required: true, 
      default: "MESOB Center, Hawassa" 
    },
    
    employmentType: {
      type: String,
      default: "Public Service"
    },
    
    featuredOnHome: { type: Boolean, default: false },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { timestamps: true }
);

// Virtual tracking flag for expiration processing
jobSchema.virtual("isExpired").get(function () {
  return new Date() > this.deadline;
});

// Ensure virtuals are parsed cleanly when outputting JSON object payloads to the frontend
jobSchema.set("toJSON", { virtuals: true });
jobSchema.set("toObject", { virtuals: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;