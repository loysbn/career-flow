export interface JobBody {
    company: string;
    position: string;
    status: "Applied" | "Interview" | "Rejected" | "Offer";
    dateApplied: Date;
    notes?: string;
    location?: string;
}