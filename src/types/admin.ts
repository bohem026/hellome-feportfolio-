export type ProjectStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  visibility: string;
  imageUrl: string;
}

export type InquiryStatus = "NEW" | "SCHEDULED" | "RESPONDED";

export interface Inquiry {
  id: string;
  sender: string;
  role: string;
  message: string;
  timeAgo: string;
  status: InquiryStatus;
}

export type AdminTab = "overview" | "projects" | "inquiries";
