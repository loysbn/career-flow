import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Offer"],
    default: "Applied"
  },
  location: {
    type: String,
    default: ""
  },
  dateApplied: Date,
  notes: String
});

export default mongoose.model("Job", jobSchema);