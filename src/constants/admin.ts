import { Project, Inquiry } from "@/types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "01",
    title: "HUNTER YEANY RACING",
    category: "BRAND / WEB",
    status: "PUBLISHED",
    visibility: "PUBLIC / TIER 1",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "02",
    title: "VELOCE OS",
    category: "UI/UX / MOTION",
    status: "PUBLISHED",
    visibility: "PUBLIC / TIER 1",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "03",
    title: "WALKER AGENCY",
    category: "ART DIRECTION",
    status: "DRAFT",
    visibility: "PRIVATE / UNLISTED",
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80",
  },
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "req-1",
    sender: "Klara Lindqvist",
    role: "Talent Lead @ Aone Studios, Stockholm",
    message:
      "We reviewed the Veloce Racing case study. Seeking Design Director for Q4 European flagship digital revamp.",
    timeAgo: "NEW - 10M AGO",
    status: "NEW",
  },
  {
    id: "req-2",
    sender: "Marcus Vance",
    role: "Partner @ Pentagram NYC",
    message:
      "Confirmed sync for prospective collaborative pitch on global automotive client identity system.",
    timeAgo: "SCHEDULED - TOMORROW 15:00",
    status: "SCHEDULED",
  },
  {
    id: "req-3",
    sender: "Elena Rostova",
    role: "Head of Brand @ Ledger, Paris",
    message:
      "Initial NDA and rate deck dispatched. Waiting on security validation review.",
    timeAgo: "RESPONDED - 2D AGO",
    status: "RESPONDED",
  },
];
