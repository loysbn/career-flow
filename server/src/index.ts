import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Request, Response } from "express"

import jobRoutes from "./routes/job.routes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//middleware
app.use(express.json());

app.get("/api/test", (req: Request, res: Response) => {
  res.send("API is working");
})

app.use("/api/jobs", jobRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
