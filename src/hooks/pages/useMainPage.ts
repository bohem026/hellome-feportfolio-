'use client';

import { useState } from 'react';
import { FEATURED_WORKS, PROCESS_STEPS, FAQS } from '@/constants';
import { WorkItem, ProcessItem, FAQItem } from '@/types';

export function useMainPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return {
    featuredWorks: FEATURED_WORKS as WorkItem[],
    processSteps: PROCESS_STEPS as ProcessItem[],
    faqs: FAQS as FAQItem[],
    openFaq,
    toggleFaq,
  };
}