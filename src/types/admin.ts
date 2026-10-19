export type ProjectStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";
export type InquiryStatus = "NEW" | "SCHEDULED" | "RESPONDED";
export type AdminTab = "overview" | "projects" | "inquiries";

export interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  visibility: string;
  image_url: string;
}

export interface Inquiry {
  id: string;
  sender: string;
  role: string;
  message: string;
  timeAgo: string;
  status: InquiryStatus;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}
