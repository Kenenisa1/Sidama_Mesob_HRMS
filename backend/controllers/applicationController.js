import Application from "../models/Application.js";
import Job from "../models/Job.js";
import fs from "fs";

/**
 * @desc    Submit a structured multipart/form-data job application
 * @route   POST /api/applications/submit
 * @access  Private
 */
export const submitApplication = async (req, res) => {
  const localizedFilesCache = [];
  if (req.files) {
    Object.keys(req.files).forEach((key) => {
      req.files[key].forEach((file) => localizedFilesCache.push(file.path));
    });
  }

  const rollbackUploadedFiles = () => {
    localizedFilesCache.forEach((filePath) => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error(
          `Asset tracking rollback failed for path: ${filePath}`,
          err,
        );
      }
    });
  };

  try {
    // 1. Check for required files
    if (
      !req.files ||
      !req.files.cv ||
      !req.files.degreeCertificate ||
      !req.files.nationalIdCopy
    ) {
      rollbackUploadedFiles();
      return res.status(400).json({
        success: false,
        message:
          "Submission failed: Mandatory files are missing (CV, Degree, and National ID copy required).",
      });
    }

    // 2. Parse text parameters stringified from React application hooks safely
    let personalInfo = {};
    let residency = {};
    let education = {};

    try {
      personalInfo =
        typeof req.body.personalInfo === "string"
          ? JSON.parse(req.body.personalInfo)
          : req.body.personalInfo || {};
      residency =
        typeof req.body.residency === "string"
          ? JSON.parse(req.body.residency)
          : req.body.residency || {};
      education =
        typeof req.body.education === "string"
          ? JSON.parse(req.body.education)
          : req.body.education || {};
    } catch (parseErr) {
      rollbackUploadedFiles();
      return res.status(400).json({
        success: false,
        message:
          "Malformed client payload format: Unable to process data structures.",
      });
    }

    const jobId = req.body.jobId;
    let sidaamuAfoo = (req.body.sidaamuAfoo || "BASIC")
      .toString()
      .trim()
      .toUpperCase();
    const sidaamuAfooOptions = ["BASIC", "INTERMEDIATE", "FLUENT", "NATIVE"];
    if (!sidaamuAfooOptions.includes(sidaamuAfoo)) sidaamuAfoo = "BASIC";

    if (!jobId) {
      rollbackUploadedFiles();
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Validation failure: Target vacancy jobId must be specified.",
        });
    }

    // 3. Target structural alignment validations
    const targetVacancy = await Job.findById(jobId);
    if (!targetVacancy) {
      rollbackUploadedFiles();
      return res
        .status(404)
        .json({
          success: false,
          message: "Target placement opening is invalid, closed, or archived.",
        });
    }

    const userCgpaMetric = parseFloat(education.cgpa) || 0;
    if (targetVacancy.cgpa && userCgpaMetric < targetVacancy.cgpa) {
      rollbackUploadedFiles();
      return res.status(400).json({
        success: false,
        message: `Validation Error: Your reported CGPA (${userCgpaMetric}) does not clear the required threshold (${targetVacancy.cgpa}+) for this position.`,
      });
    }

    // 4. Clean mapping configuration assignment matching your Mongoose models
    const operationalApplicationRecord = new Application({
      userId: req.user?.id || "65f1234567890abcdef12345",
      jobId: targetVacancy._id,
      sidaamuAfoo,

      personalInfo: {
        firstName: personalInfo.firstName?.trim() || "Unknown",
        middleName: personalInfo.middleName?.trim() || "",
        lastName: personalInfo.lastName?.trim() || "Unknown",
        email: personalInfo.email?.toLowerCase()?.trim() || "",
        phone: personalInfo.phone?.trim() || "",
        faydaId: personalInfo.faydaId?.trim() || "",
        gender: personalInfo.gender || "Male",
      },

      residency: {
        woreda: residency.woreda || "",
        kebele: residency.kebele || "",
        houseNumber: residency.houseNumber?.trim() || "New/Unassigned",
      },

      education: {
        level: education.level || "Bachelor",
        institution: education.institution?.trim() || "",
        fieldOfStudy: education.fieldOfStudy || "",
        cgpa: userCgpaMetric,
        graduationYear: parseInt(education.graduationYear) || 2026,
        experienceYears: parseInt(education.experienceYears) || 0,
        sidaamuAfooProficiency: sidaamuAfoo,
      },

      documents: {
        cv: req.files.cv[0].path,
        degreeCertificate: req.files.degreeCertificate[0].path,
        nationalIdCopy: req.files.nationalIdCopy[0].path,
        otherCertificates: req.files.otherCert
          ? req.files.otherCert.map((file) => file.path)
          : [],
      },
    });

    const activeSaveOutput = await operationalApplicationRecord.save();

    res.status(201).json({
      success: true,
      message: "Application logs submitted to Hawassa Pulse successfully.",
      trackingId: activeSaveOutput.trackingId,
      application: activeSaveOutput,
    });
  } catch (error) {
    rollbackUploadedFiles();
    console.error(
      "Critical Exception Tripped in Registry Management Pipeline:",
      error,
    );

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "Duplicate Entry Error: An active application matching this user profile or Fayda token already exists.",
      });
    }

    res
      .status(500)
      .json({
        success: false,
        message:
          "Internal application submission configuration runtime malfunction.",
      });
  }
};

/**
 * @desc    Get application log linked to current user session context
 * @route   GET /api/applications/my-application
 * @access  Private
 */
export const getMyApplication = async (req, res) => {
  try {
    const activeUserTokenId = req.user?.id || "65f1234567890abcdef12345";
    const application = await Application.findOne({
      userId: activeUserTokenId,
    }).populate("jobId", "title department code deadline");

    if (!application) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "No active application record matches this user profile context.",
        });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Fetch all application logs across systems
 * @route   GET /api/applications/all
 * @access  Private/Admin
 */
export const getAllApplications = async (req, res) => {
  try {
    const indexCollection = await Application.find()
      .populate("jobId", "title department structuralLevel")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: indexCollection.length,
      data: indexCollection,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not parse data index references.",
      });
  }
};

/**
 * @desc    Get a specific application by ID
 * @route   GET /api/applications/:id
 * @access  Private/Admin
 */
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id).populate(
      "jobId",
      "title department structuralLevel",
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not fetch application",
    });
  }
};

/**
 * @desc    Update application status (Shortlist, Accept, Reject)
 * @route   PATCH /api/applications/:id/status
 * @access  Private/Admin
 */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Accepted",
      "Rejected",
    ];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Application status updated to ${status}`,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not update application status",
    });
  }
};
