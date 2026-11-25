export interface WorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export interface ProcessItem {
  step: string;
  title: string;
  description: string;
  phase: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ShowcaseItem {
  id: number | string;
  indexLabel: string;
  title: string;
  categories: string[];
  imageUrl: string;
  commitCount: number;
  stars: number;
  linkUrl: string;
}
