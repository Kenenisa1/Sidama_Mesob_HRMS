import Job from "../models/Job.js";


// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE JOB
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};