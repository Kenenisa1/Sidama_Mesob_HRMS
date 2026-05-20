import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

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

    languages: {
      amharic: {
        type: Boolean,
        default: false,
      },

      english: {
        type: Boolean,
        default: false,
      },
    },

    status: {
      type: String,
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;