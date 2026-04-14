import { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Portal,
  Input,
  Field,
  CloseButton,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const StatusList = createListCollection({
  items: [
    { label: "Applied", value: "Applied" },
    { label: "Interview", value: "Interview" },
    { label: "Offer", value: "Offer" },
    { label: "Rejected", value: "Rejected" },
  ],
});

export default function JobForm({ editingJob, setEditingJob, setJobs }: any) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const isEditing = !!editingJob;

  useEffect(() => {
    if (editingJob) {
      setCompany(editingJob.company);
      setPosition(editingJob.position);
      setDate(editingJob.dateApplied?.slice(0, 10) || "");
      setStatus([editingJob.status]);
      setLocation(editingJob.location || "");
      setNotes(editingJob.notes || "");
    }
  }, [editingJob]);

  useEffect(() => {
    if (editingJob) {
      setOpen(true);
    }
  }, [editingJob]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!company.trim() || !position.trim() || !status.length) {
      toast.error("Please fill in the required fields");
      return;
    }

    try {
      if (isEditing) {
        const updatedData = {
          _id: editingJob._id,
          company,
          position,
          status: status[0],
          dateApplied: date ? new Date(date) : new Date(),
          notes,
          location,
        };
        await api.put(`/jobs/${editingJob._id}`, updatedData);
        setJobs((prev: any) =>
          prev.map((job: any) =>
            job._id === editingJob._id ? updatedData : job,
          ),
        );
        toast.success("Job application updated");
      } else {
        const res = await api.post("/jobs", {
          company,
          position,
          status: status[0],
          dateApplied: date ? new Date(date) : new Date(),
          notes,
          location,
        });
        setJobs((prev: any) => [res.data, ...prev]);
        toast.success("Job application added!");
      }
    } catch (error) {
      toast.error("An error occurred while adding job application");
    }

    resetForm();
    setEditingJob(null);
    setOpen(false);
  };

  const resetForm = () => {
    setStatus([]);
    setCompany("");
    setPosition("");
    setDate("");
    setNotes("");
    setLocation("");
  };

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={(d) => setOpen(d.open)}>
        <Dialog.Trigger asChild>
          <Button
            bg="#3B82F6"
            color="white"
            _hover={{ bg: "#2563EB" }}
            size="md"
          >
            + Add Job Application
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  {isEditing ? "Edit Job Application" : "Add Job Application"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Field.Root required>
                  <Field.Label>
                    Company
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Position
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Status
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Select.Root
                    collection={StatusList}
                    value={status}
                    onValueChange={(e) => setStatus(e.value)}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select status" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {StatusList.items.map((StatusList) => (
                            <Select.Item
                              item={StatusList}
                              key={StatusList.value}
                            >
                              {StatusList.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Date Applied</Field.Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Location</Field.Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Notes</Field.Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Field.Root>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setEditingJob(null);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button
                    bg="#3B82F6"
                    _hover={{ bg: "#2563EB" }}
                    onClick={handleSubmit}
                  >
                    {isEditing ? "Save" : "Add"}
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={resetForm} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
