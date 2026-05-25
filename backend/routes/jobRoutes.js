import express from "express";
import {
  createJob,
  getJobs,
  getJob,
  getSingleJob,
  updateJob,
  deleteJob,
  submitJobApplication,
} from "../controllers/jobController.js";

const router = express.Router();

// CREATE A NEW VACANCY ANNOUNCEMENT (HR Admin Only)
router.post("/", createJob);

// RETRIEVE VACANCIES (Supports ?viewMode=public and ?featured=true)
router.get("/", getJobs);

// RETRIEVE DETAILS FOR A SINGLE POSITION
router.get("/:id", getJob);

// SUBMIT AN APPLICATION (Includes Expiration Check Interceptor Gate)
router.post("/:id/apply", submitJobApplication);

// UPDATE AN EXISTING LISTING (HR Admin Only)
router.put("/:id", updateJob);

// PURGE A RECORD FROM THE SYSTEM (HR Admin Only)
router.delete("/:id", deleteJob);
router.get("/:id", getSingleJob);

export default router;