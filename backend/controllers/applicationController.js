import Application from '../models/Application.js';

export const submitApplication = async (req, res) => {
  try {
    // 1. Verify files exist
    if (!req.files || !req.files.degreeCertificate || !req.files.nationalIdCopy) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required documents in Step 4" 
      });
    }

    // 2. Parse the text data
    const data = JSON.parse(req.body.data);

    // 3. Create the document object with MOCK ID and MAPPED FIELDS
    const newApplication = new Application({
      // FIX: Use a hardcoded MongoDB ID since req.user is undefined right now
      userId: "65f1234567890abcdef12345", 
      jobId: data.jobId || "65f9876543210fedcba09876",

      personalInfo: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        faydaId: data.faydaId,
        gender: data.gender // 'Male' or 'Female' from StepOne
      },

      residency: {
        woreda: data.woreda,
        kebele: data.kebele,
        address: data.address || ""
      },

      education: {
        // FIX: Map 'eduLevel' from frontend to 'level' in backend + Fix Enum
        level: data.eduLevel === 'Bachelors' ? 'Bachelor' : data.eduLevel, 
        institution: data.institution,
        fieldOfStudy: data.department, // Mapping 'department' to 'fieldOfStudy'
        cgpa: Number(data.cgpa) || 0,
        graduationYear: Number(data.gradYear),
        experienceYears: Number(data.experience) || 0
      },

      documents: {
        degreeCertificate: req.files.degreeCertificate[0].path,
        nationalIdCopy: req.files.nationalIdCopy[0].path,
        cv: req.files.cv ? req.files.cv[0].path : null
      },

      status: 'Pending' // Capitalized to match your Enum
    });

    // 4. Save to MongoDB
    const savedApplication = await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      trackingId: savedApplication.trackingId
    });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message // Showing real error message for debugging
    });
  }
};

// Update this too so it doesn't crash during testing
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
