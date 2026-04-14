import {
  Badge,
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  Portal,
  Dialog,
  CloseButton,
  Button,
} from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import type { Job } from "../types/job.type";
import { formatDate } from "../lib/formatDate";
import { useState } from "react";
import { LucideTrash2, LucideEdit } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

type JobCardProps = {
  job: Job;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  onEdit: (job: Job) => void;
};

const statusColors = {
  Applied: { color: "#3B82F6", bg: "rgba(59, 130, 246, 0.2)" },
  Interview: { color: "#FBBF24", bg: "rgba(245, 158, 11, 0.2)" },
  Offer: { color: "#4ADE80", bg: "rgba(34, 197, 94, 0.2)" },
  Rejected: { color: "#F87171", bg: "rgba(239, 68, 68, 0.2)" },
};

const JobCard = ({ job, setJobs, onEdit }: JobCardProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (e: any, id: string) => {
    e.preventDefault();

    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("Job application has been successfully deleted");
    } catch (error) {
      toast.error("Failed to delete job application");
    }
  };

  return (
    <div>
      <Box
        bg="#1E1E1E"
        p={5}
        borderRadius="xl"
        border="1px solid"
        borderColor="#333333"
      >
        <Flex justify={"space-between"}>
          <Box>
            <Text color="white" fontWeight="bold">
              {job.company}
            </Text>
            <Text color="gray.400">{job.position}</Text>
          </Box>

          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                aria-label="menu"
                variant="ghost"
                size="sm"
                color="gray.400"
              >
                <MoreVertical />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="edit" onClick={() => onEdit(job)}>
                    <LucideEdit size="14" />
                    Edit
                  </Menu.Item>
                  <Menu.Item value="delete" onClick={() => setOpen(true)}>
                    <LucideTrash2 size="14" />
                    Delete
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>

        <Dialog.Root
          role="alertdialog"
          open={open}
          size="sm"
          onOpenChange={(e) => setOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content bg="#1e1e1e" color="white">
                <Dialog.CloseTrigger asChild>
                  <CloseButton color="white" _hover={{ color: "black" }} />
                </Dialog.CloseTrigger>
                <Dialog.Header>
                  <Dialog.Title>Confirm Delete</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button
                    bg="white"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    _hover={{ bg: "black", color: "white" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorPalette="red"
                    onClick={(e) => handleDelete(e, job._id)}
                  >
                    Delete
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        <Badge
          color={statusColors[job.status]?.color}
          bg={statusColors[job.status]?.bg}
          variant="subtle"
          px={2}
          py={1}
          borderRadius="md"
          mt={10}
        >
          {job.status}
        </Badge>

        <Text fontSize="sm" color="gray.400">
          📅 {formatDate(new Date(job.dateApplied))}
        </Text>

        <Text fontSize="sm" color="gray.400">
          📍 {job.location}
        </Text>

        <Box mt={1} borderBottom="1px solid" borderColor="gray.600" />

        <Text fontSize="sm" mt={2} color="gray.400">
          {job.notes}
        </Text>
      </Box>
    </div>
  );
};

export default JobCard;
