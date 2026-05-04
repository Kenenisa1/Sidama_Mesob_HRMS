import Application from '../models/Application.js';

export const submitApplication = async (req, res) => {
  try {
    // 1. Verify files exist from Step 4
    if (!req.files || !req.files.degreeCertificate || !req.files.nationalIdCopy) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required documents in Step 4" 
      });
    }

    // 2. Parse the text data (Steps 1, 2, 3) sent from frontend
    // In multipart/form-data, non-file fields are usually sent as strings
    const applicationData = JSON.parse(req.body.data);

    // 3. Create the document object with file paths
    const newApplication = new Application({
      ...applicationData,
      userId: req.user.id, // Derived from JWT Auth Middleware
      documents: {
        degreeCertificate: req.files.degreeCertificate[0].path,
        nationalIdCopy: req.files.nationalIdCopy[0].path,
        cv: req.files.cv ? req.files.cv[0].path : null
      }
    });

    // 4. Save to MongoDB
    const savedApplication = await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted to Hawassa Pulse successfully",
      trackingId: savedApplication.trackingId
    });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: Could not process application" 
    });
  }
};

// Get Application Status for the user
export const getMyApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ userId: req.user.id });
    if (!application) {
      return res.status(404).json({ success: false, message: "No application found" });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};