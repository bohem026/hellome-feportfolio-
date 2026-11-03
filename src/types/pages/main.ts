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
