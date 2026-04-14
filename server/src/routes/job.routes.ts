import express from "express";
import { JobController } from "../controllers/job.controller";

const router = express.Router();

// Define your job-related routes here
router.get("/", JobController.getAllJobs);
router.get("/:id", JobController.getJobById);
router.post("/", JobController.createJob);
router.put("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

export default router;