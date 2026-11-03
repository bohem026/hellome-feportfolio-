export interface WorkProject {
  id: string;
  archiveNum: string;
  year: string;
  categoryTag: string;
  categoryLabel: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

export type ViewMode = "grid" | "table";
