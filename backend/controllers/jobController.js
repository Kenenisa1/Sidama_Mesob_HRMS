import Job from "../models/Job.js";
import { dispatchJobNotification } from "../utils/notificationEngine.js";
import mongoose from "mongoose";

/**
 * @route   POST /api/jobs
 * @desc    Publish a new Mesob civil service vacancy & compute exact deadline parameters
 * @access  Protected (HR Administrator)
 */

export const createJob = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Administrative payload content cannot be empty.",
      });
    }

    const rankStr = req.body.rankLevel || "Level VII";
    const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(rankStr);
    const windowDays = isHighRank ? 10 : 5;

    // 2. Automatically compute accurate expiration timeline from this insertion point
    const computedDeadline = new Date();
    computedDeadline.setDate(computedDeadline.getDate() + windowDays);

    // 3. Normalize Multi-Language Incoming Body Structures
    // Safely parsing both nested objects {languages: {sidama: true}} AND flat parameters {sidama: true}
    const hasLanguagesObj = req.body.languages && typeof req.body.languages === 'object';
    
    const sidamaLang = hasLanguagesObj 
      ? req.body.languages.sidama !== false 
      : req.body.sidama !== false;

    const amharicLang = hasLanguagesObj
      ? (req.body.languages.amharic === true || req.body.languages.amharic === "true")
      : (req.body.amharic === true || req.body.amharic === "true");

    const englishLang = hasLanguagesObj
      ? (req.body.languages.english === true || req.body.languages.english === "true")
      : (req.body.english === true || req.body.english === "true");

    // 4. Force clean structure matching Sidama Mesob database rules
    const cleanData = {
      title: req.body.title?.trim(),
      jobCode: req.body.jobCode?.trim(),
      department: req.body.department,
      rankLevel: rankStr.trim(),
      salary: Number(req.body.salary) || 0,
      positions: req.body.positions ? Number(req.body.positions) : 1,
      eligibleFields: req.body.eligibleFields?.trim(),
      experienceRequirements: req.body.experienceRequirements?.trim(),
      requiresCO_C: req.body.requiresCOC === true || req.body.requiresCOC === "true", // backward compat catch
      requiresCOC: req.body.requiresCOC === true || req.body.requiresCOC === "true",
      
      // Parse multi-language sub-document mapping flags safely from normalized checks
      languages: {
        sidama: sidamaLang,
        amharic: amharicLang,
        english: englishLang,
      },
      
      registrationWindowDays: windowDays,
      deadline: computedDeadline, // Set automatically based on institutional guidelines (May 2026 + days)
      location: "MESOB Center, Hawassa", // Enforced static deployment zone
      employmentType: "Public Service",
      featuredOnHome: req.body.featuredOnHome === true || req.body.featuredOnHome === "true",
      status: req.body.status || "published"
    };

    // 5. Commit clean record block to MongoDB cluster
    const job = await Job.create(cleanData);

    // Asynchronous Fire-and-Forget Notification Engine Hook
    if (typeof dispatchJobNotification === "function" && job.status === "published") {
      dispatchJobNotification(job);
    }

    return res.status(201).json({
      success: true,
      message: `Vacancy successfully registered into Mesob archives. Open window calculated at ${windowDays} operational days.`,
      job,
    });
  } catch (error) {
    console.error(" 🚨 [HRMS Core] CreateJob Exception:", error);
    
    // Intercept duplicate tracking code entries gracefully
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Unique Constraint Violation: The Registry Serial Code (jobCode) already exists in the system database.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.name === "ValidationError" 
        ? `Schema Validation Error: ${error.message}` 
        : "Internal Server Error parsing civil service record.",
    });
  }
};

/**
 * @route   GET /api/jobs
 * @desc    Get all active vacancies with conditional homepage optimization & expiration checks
 * @access  Public
 */
export const getJobs = async (req, res) => {
  try {
    const { viewMode, department } = req.query;
    const currentTime = new Date();
    let queryConditions = {};

    // 1. Apply generic department filtering if requested by client structures
    if (department && department !== "All") {
      queryConditions.department = department;
    }

    // 2. Conditional Query Routing Strategy
    if (viewMode === "homepage") {
      // 🌟 CRITICAL RULE: Homepage strictly hides expired items. Deadline MUST be in the future.
      queryConditions.deadline = { $gt: currentTime }; 
      
      // Prioritize featured listings, sorted by newest first, capped to top 4 cards
      const homepageJobs = await Job.find(queryConditions)
        .sort({ featuredOnHome: -1, createdAt: -1 })
        .limit(4);
        
      return res.status(200).json(homepageJobs);
    }

    // 3. Default (Open Roles Page): Keep active and expired items searchable in directory views
    const allDirectoryJobs = await Job.find(queryConditions).sort({ createdAt: -1 });
    return res.status(200).json(allDirectoryJobs);

  } catch (error) {
    console.error("Database query exception:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Mesob Registry failed to process active vacancy filters." 
    });
  }
};

/**
 * @route   GET /api/jobs/:id
 * @desc    Retrieve structured details for a single targeted position reference
 * @access  Public / Internal
 */
export const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "The requested job reference ID format is structurally invalid.",
      });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Target position parameters not located inside database registries.",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("⛔ [HRMS Core] GetJob Exception:", error);
    return res.status(500).json({ success: false, message: "Internal processing lookup exception." });
  }
};

/**
 * @route   PUT /api/jobs/:id
 * @desc    Modify target profile parameters dynamically & recalculate timelines on Rank shifts
 * @access  Protected (HR Administrator)
 */
export const updateJob = async (req, res) => {
  try {
    // If the admin modifies the rank level, recalculate the window and deadline rules automatically
    if (req.body.rankLevel) {
      const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(req.body.rankLevel);
      req.body.registrationWindowDays = isHighRank ? 10 : 5;
      
      const computedDeadline = new Date();
      computedDeadline.setDate(computedDeadline.getDate() + req.body.registrationWindowDays);
      req.body.deadline = computedDeadline;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Target document registry link dropped." });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error("⛔ [HRMS Core] UpdateJob Exception:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Purge a post cleanly from active collection maps
 * @access  Protected (HR Administrator)
 */
export const deleteJob = async (req, res) => {
  try {
    const targetedDoc = await Job.findByIdAndDelete(req.params.id);

    if (!targetedDoc) {
      return res.status(404).json({ success: false, message: "Target record has already been modified or dropped." });
    }

    return res.status(200).json({
      success: true,
      message: "Job opening dropped and removed cleanly from database index.",
    });
  } catch (error) {
    console.error("⛔ [HRMS Core] DeleteJob Exception:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route   GET /api/jobs/single/:id
 * @desc    Get details for validation checks inside submission panels
 * @access  Internal / Public
 */
export const getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ 
        message: "The requested vacancy entry could not be found or has been archived." 
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Error retrieving detailed vacancy profile:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid application stream tracking ID format." });
    }
    return res.status(500).json({ message: "Internal server error reading data registry entry." });
  }
};

/**
 * @route   POST /api/jobs/:id/apply
 * @desc    Secure candidate job application gateway interceptor with live expiration checks
 * @access  Public
 */
export const submitJobApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Structural format of tracking ID is invalid." });
    }

    const targetedJob = await Job.findById(id);
    if (!targetedJob) {
      return res.status(404).json({ success: false, message: "The targeted vacancy does not exist inside our active systems." });
    }

    // 🔒 THE FIREWALL GATEWAY: Compare current server time against stored timestamp
    const rightNow = new Date();
    if (new Date(targetedJob.deadline) <= rightNow) {
      return res.status(410).json({
        success: false,
        message: `Application Rejected: The official civil registration window for this position closed on ${new Date(targetedJob.deadline).toLocaleDateString()}. Submissions are no longer authorized.`,
      });
    }

    // Proceed with creating database record in application collection schemas...
    return res.status(200).json({
      success: true,
      message: "Application gateway baseline check cleared. Processing packet transmission authorized.",
    });
  } catch (error) {
    console.error("⛔ [HRMS Gate] Inbound Application Intercept Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};