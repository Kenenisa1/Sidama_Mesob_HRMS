import Application from '../models/Application.js';

export const submitApplication = async (req, res) => {
  try {
    // DEBUG: Check what is actually hitting your server
    console.log("RECEIVED BODY:", req.body);

    const { 
      fullName, email, phone, gender, 
      eduLevel, institution, department, gradYear, 
      faydaId, woreda, kebele, cgpa, experience, sidaamuAfoo
    } = req.body;

    // Split Name safely
    const nameParts = fullName ? fullName.trim().split(/\s+/) : [];
    const fName = nameParts[0] || "Unknown";
    const lName = nameParts.slice(1).join(' ') || "Unknown";

    const newApplication = new Application({
      userId: req.user?.id || "65f1234567890abcdef12345", 
      jobId: req.body.jobId || "65f9876543210fedcba09876", 

      personalInfo: {
        firstName: fName,
        lastName: lName,
        email: email,
        phone: phone,
        faydaId: faydaId, // Will now use actual ID from frontend
        gender: gender
      },

      residency: {
        woreda: woreda,
        kebele: kebele
      },

      education: {
        level: eduLevel, 
        institution: institution,
        fieldOfStudy: department,
        cgpa: parseFloat(cgpa) || 0,
        graduationYear: gradYear,
        experienceYears: parseInt(experience, 10) || 0,
        sidaamuAfoo: sidaamuAfoo || 'Basic'
      },

      documents: {
        degreeCertificate: req.files?.degreeCertificate?.[0]?.path,
        nationalIdCopy: req.files?.nationalIdCopy?.[0]?.path,
        cv: req.files?.cv?.[0]?.path || null
      },
      
      status: 'Pending'
    });

    const savedApplication = await newApplication.save();
    res.status(201).json({ success: true, trackingId: savedApplication.trackingId });

  } catch (error) {
    console.error("Database Save Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getMyApplication = async (req, res) => {
    // Return the mock user's application for now
    try {
        const application = await Application.findOne({ userId: "65f1234567890abcdef12345" });
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not fetch applications"
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not fetch application"
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Application status updated to ${status}`,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not update application status"
    });
  }
};
