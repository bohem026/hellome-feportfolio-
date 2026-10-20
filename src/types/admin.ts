export type ProjectStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";
export type InquiryStatus = "NEW" | "SCHEDULED" | "RESPONDED";
export type AdminTab = "overview" | "projects" | "inquiries";

export interface Project {
  id: number;
  title: string;
  categories: string[];
  status: ProjectStatus;
  image_url: string;
  description?: string;
  github_url?: string;
  stars?: number;
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
  description: string | null;
  github_url: string;
  stargazers_count: number;
  languages: string[];
  updated_at: string;
}
