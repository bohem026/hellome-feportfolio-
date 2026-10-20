export type ProjectStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";
export type InquiryStatus = "NEW" | "SCHEDULED" | "RESPONDED";
export type AdminTab = "overview" | "projects" | "inquiries";

export interface Project {
  id: number;
  title: string;
  category: string;
  status: ProjectStatus;
  imageUrl: string;
  description?: string;
  githubUrl?: string;
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
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stargazersCount: number;
  language: string | null;
  updatedAt: string;
  topics?: string[];
}
