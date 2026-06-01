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

    // 1. Evaluate Civil Service Rank to determine the open application window
    const rankStr = req.body.rankLevel || "Level VII";
    const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(rankStr);
    const windowDays = isHighRank ? 10 : 5;

    // 2. Automatically compute accurate expiration timeline from this insertion point
    const computedDeadline = new Date();
    computedDeadline.setDate(computedDeadline.getDate() + windowDays);

    // 3. Normalize Multi-Language Incoming Body Structures
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

    // 4. Extract raw text from incoming schema pipeline to prevent drop exceptions
    const rawDescription = req.body.description?.trim();
    const rawRequirements = req.body.requirements?.trim() || req.body.experienceRequirements?.trim();

    // 5. Hard validation check before committing directly to database layer
    if (!rawDescription || !rawRequirements) {
      return res.status(400).json({
        success: false,
        message: `Validation Exception: Both 'description' and 'requirements' must be supplied by the administrator UI view.`
      });
    }

    // 6. Assemble finalized pristine structure matching your Mongoose strict model rules
    const cleanData = {
      title: req.body.title?.trim(), 
      jobCode: req.body.jobCode?.trim(), 
      department: req.body.department?.trim(),
      rankLevel: rankStr.trim(), 
      salary: Number(req.body.salary) || 0,
      positions: req.body.positions ? Number(req.body.positions) : 1,
      eligibleFields: req.body.eligibleFields?.trim(), 
      experienceRequirements: req.body.experienceRequirements?.trim(), 
      requiresCOC: req.body.requiresCOC === true || req.body.requiresCOC === "true",

      // BIND DIRECTLY TO UI BODY PAYLOAD (NO HIDDEN ARBITRARY STRINGS)
      description: rawDescription,
      requirements: rawRequirements,
      
      // PARSE ADMIN SPECIFIED CGPA ACCURATELY
      cgpa: !isNaN(parseFloat(req.body.cgpa)) ? parseFloat(parseFloat(req.body.cgpa).toFixed(2)) : 0,

      languages: {
        sidama: sidamaLang,
        amharic: amharicLang,
        english: englishLang,
      },

      registrationWindowDays: windowDays,
      deadline: computedDeadline, 
      
      // READ DYNAMICALLY FROM ADMIN SUBMISSION WITH SOLID SYSTEM DEFAULTS
      location: req.body.location?.trim() || "MESOB Center, Hawassa", 
      employmentType: req.body.employmentType?.trim() || "Public Service",
      
      featuredOnHome: req.body.featuredOnHome === true || req.body.featuredOnHome === "true",
      status: req.body.status || "published"
    };

    // 7. Commit clean record block to MongoDB cluster
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

    // Apply generic department filtering if requested by client structures
    if (department && department !== "All") {
      queryConditions.department = department;
    }

    // Conditional Query Routing Strategy
    if (viewMode === "homepage") {
      // Homepage strictly hides expired items. Deadline MUST be in the future.
      queryConditions.deadline = { $gt: currentTime };

      // Prioritize featured listings, sorted by newest first, capped to top 4 cards
      const homepageJobs = await Job.find(queryConditions)
        .sort({ featuredOnHome: -1, createdAt: -1 })
        .limit(4);

      return res.status(200).json(homepageJobs);
    }

    // Default (Open Roles Page): Keep active and expired items searchable in directory views
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
 * @access  Public
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
 * @desc    Modify target profile parameters dynamically, normalize incoming payloads & handle Rank shifts
 * @access  Protected (HR Administrator)
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "The requested job reference ID format is structurally invalid.",
      });
    }

    // 1. Capture updates and dynamically structure incoming data fields
    let updates = { ...req.body };

    // 2. Handle dynamically computed timeline rules if Rank Level is shifted
    if (updates.rankLevel) {
      const isHighRank = /Level\s+(VIII|IX|X|XI|XII|XIII|XIV)/i.test(updates.rankLevel);
      updates.registrationWindowDays = isHighRank ? 10 : 5;

      const computedDeadline = new Date();
      computedDeadline.setDate(computedDeadline.getDate() + updates.registrationWindowDays);
      updates.deadline = computedDeadline;
    } else if (updates.deadline) {
      // If the admin manually changed the custom expiration deadline instead
      updates.deadline = new Date(updates.deadline);
    }

    // 3. Normalize Multi-Language Array structures coming from frontend components back into Schema Objects
    if (updates.languages && Array.isArray(updates.languages)) {
      updates.languages = {
        sidama: updates.languages.includes("Sidama"),
        amharic: updates.languages.includes("Amharic"),
        english: updates.languages.includes("English"),
      };
    } else if (typeof updates.sidama !== 'undefined' || typeof updates.amharic !== 'undefined') {
      // Fallback fallback handle if separate flags were passed directly
      updates.languages = {
        sidama: updates.sidama === true || updates.sidama === "true",
        amharic: updates.amharic === true || updates.amharic === "true",
        english: updates.english === true || updates.english === "true",
      };
    }

    // 4. Fire localized updates strictly through Mongoose validators
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ 
        success: false, 
        message: "Target vacancy document registry link dropped or missing from collection index." 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vacancy parameter specifications modified successfully.",
      job: updatedJob
    });

  } catch (error) {
    console.error("⛔ [HRMS Core] UpdateJob Exception:", error);
    
    return res.status(500).json({ 
      success: false, 
      message: error.name === "ValidationError" 
        ? `Schema Validation Failed: ${error.message}` 
        : "Internal processing update exception handling your payload data structures." 
    });
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
 * @desc    Get details for validation checks inside submission panels (Alias Fallback)
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

    return res.status(200).json({
      success: true,
      message: "Application gateway baseline check cleared. Processing packet transmission authorized.",
    });
  } catch (error) {
    console.error("⛔ [HRMS Gate] Inbound Application Intercept Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};