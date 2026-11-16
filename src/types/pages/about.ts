export interface TechCraftItem {
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  tags: string[];
}

export interface MilestoneItem {
  id: string;
  period: string;
  organization: string;
  title: string;
  role: string;
  category: string;
  highlights: string[];
}