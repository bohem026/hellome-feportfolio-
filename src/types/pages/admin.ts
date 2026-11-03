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

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  github_url: string;
  stargazers_count: number;
  languages: string[];
  updated_at: string;
}
