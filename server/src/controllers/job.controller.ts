import { RequestHandler } from "express";
import Job from "../models/job.model";
import { JobBody } from "../types/job.type";


const getAllJobs: RequestHandler = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ dateApplied: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job applications", error });
    }
}

const getJobById: RequestHandler = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({ message: "Job application not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job application", error });
    }
}

const createJob: RequestHandler = async (req, res) => {
    try {
        const {company, position, status, dateApplied, notes, location} = req.body as JobBody;
        const newJob = new Job({
            company,
            position,
            status,
            dateApplied,
            notes,
            location
        });
        await newJob.save();
        res.status(201).json({message: "Job application created successfully", job: newJob});
    } catch (error) {
        res.status(500).json({ message: "Error creating job application", error });
    }
}

const updateJob: RequestHandler = async (req, res) => {
    try {
        const {company, position, status, dateApplied, notes, location} = req.body as JobBody;
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
            company,
            position,
            status,
            dateApplied,
            notes,
            location
        }, { returnDocument: "after" });
        if(!updatedJob){
            return res.status(404).json({ message: "Job application not found" });
        }
        res.status(200).json({message: "Job application updated successfully", job: updatedJob});
    } catch (error) {
        res.status(500).json({ message: "Error updating job application", error });
    }
}

const deleteJob: RequestHandler = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if(!deletedJob){
            return res.status(404).json({ message: "Job application not found" });
        }
        res.status(200).json({message: "Job application deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error deleting job application", error });
    }
}

export const JobController = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};