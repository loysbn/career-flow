import { useState, useEffect } from "react";
import { Container, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import JobCard from "../components/JobCard";
import api from "../lib/axios";
import toast from "react-hot-toast";
import JobForm from "../components/JobForm";
import type { Job } from "../types/job.type";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (error) {
        toast.error("An error occured while fetching job applications");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <Container maxW="7xl">
        <Flex justify="space-between" align="center" mb={10}>
          <Text color="white" fontWeight="bold">
            Recent Applications
          </Text>
          <JobForm
            editingJob={editingJob}
            setEditingJob={setEditingJob}
            setJobs={setJobs}
          />
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {jobs.map((job: any) => (
            <JobCard
              key={job._id}
              job={job}
              setJobs={setJobs}
              onEdit={setEditingJob}
            />
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Dashboard;
