export type ProjectStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export interface Project {
  id: number;
  title: string;
  categories: string[];
  status: ProjectStatus;
  image_url: string;
  description?: string;
  github_url?: string;
  stars?: number;
  github_id?: string;
  pushed_at?: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  languages: string[];
  description: string | null;
  github_url: string;
  stargazers_count: number;
  pushed_at: string;
}
