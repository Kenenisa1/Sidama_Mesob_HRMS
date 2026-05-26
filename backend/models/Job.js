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
<<<<<<< HEAD

    department: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    cgpa: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    positions: {
      type: Number,
      required: true,
      min: [1, "Number of positions must be at least 1"],
    },

    salary: {
      type: String,
    },

    deadline: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
    },

=======
    
    rankLevel: { 
      type: String, 
      required: true 
    }, // e.g., "Level XIV", "Level VII" (Crucial for civil service rank matching)
    
    salary: { 
      type: Number, 
      required: true 
    }, // Storing as a number allows strict budget filtering
    
    positions: { 
      type: Number, 
      required: true, 
      min: 1, 
      default: 1 
    }, // Number of open seats
    
    // Storing multiple acceptable qualifications as a text block 
    // to match the bureau's extensive qualification listing
    eligibleFields: { 
      type: String, 
      required: true 
    }, // e.g., "Computer Science, Software Engineering, IT..."
    
    experienceRequirements: { 
      type: String, 
      required: true 
    }, // e.g., "6 Years of experience in database administration"
    
    requiresCOC: { 
      type: Boolean, 
      default: false 
    }, // Certificate of Competency flag
    
    // Multilingual support requested by the bureau layout
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
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
    }, // Level VII gets 5 days; Level VIII and above get 10 days per the document guidelines
    
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

<<<<<<< HEAD
export default Job;
=======
jobSchema.set("toJSON", { virtuals: true });
jobSchema.set("toObject", { virtuals: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
>>>>>>> 542e9efbcb964d96d65aa795afab0b9a5b468114
