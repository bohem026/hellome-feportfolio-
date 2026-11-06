export type InquiryStatus = "NEW" | "SCHEDULED" | "RESPONDED";
export type AdminTab = "overview" | "projects" | "inquiries";

export interface Inquiry {
  id: string;
  sender: string;
  role: string;
  message: string;
  timeAgo: string;
  status: InquiryStatus;
}