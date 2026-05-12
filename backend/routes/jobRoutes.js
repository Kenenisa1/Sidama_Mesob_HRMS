import express from "express";

import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();


// CREATE
router.post("/", createJob);


// GET ALL
router.get("/", getJobs);


// GET SINGLE
router.get("/:id", getJob);


// UPDATE
router.put("/:id", updateJob);


// DELETE
router.delete("/:id", deleteJob);

export default router;