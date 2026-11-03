import { WorkItem, ProcessItem, FAQItem } from "@/types";

export const FEATURED_WORKS: WorkItem[] = [
  {
    id: "01",
    category: "ARCH-01 / FRONTEND ARCHITECTURE",
    title: "HUNTER YEANY RACING",
    description:
      "Comprehensive telemetry dashboard and real-time kinetic digital identity for Formula motorsport driver.",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    linkUrl: "#",
  },
  {
    id: "02",
    category: "CASE 02 / IDENTITY & E-COMMERCE",
    title: "VELOCE ATELIER",
    description:
      "Art direction and spatial digital storefront for contemporary industrial ceramic studio based in Zurich.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    linkUrl: "#",
  },
  {
    id: "03",
    category: "TYPE 003 / DIGITAL SYSTEM",
    title: "WALKER SOUND LAB",
    description:
      "Generative waveform acoustic interface and bespoke variable typography engine for spatial audio brand.",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    linkUrl: "#",
  },
];

export const PROCESS_STEPS: ProcessItem[] = [
  {
    step: "/ 01",
    title: "DISCOVERY",
    description:
      "Deconstructing foundational business intent, ecosystem benchmarks, and user behavioral archetypes before lines are drawn.",
    phase: "PHASE_01",
  },
  {
    step: "/ 02",
    title: "RESEARCH",
    description:
      "Synthesizing visual culture, architectural typography, and technical stack ergonomics into a comprehensive briefing index.",
    phase: "PHASE_02",
  },
  {
    step: "/ 03",
    title: "DESIGN",
    description:
      "Radical spatial composition, microscopic grid systems, motion prototypes, and deliberate visual tension.",
    phase: "PHASE_03",
  },
  {
    step: "/ 04",
    title: "DEVELOPMENT",
    description:
      "Pixel-exact translation utilizing Next.js, semantic clean architectures, responsive kinetics, and microsecond render paths.",
    phase: "PHASE_04",
  },
  {
    step: "/ 05",
    title: "VALIDATION",
    description:
      "Stress-testing viewport breakpoints, accessibility vectors, typography responsiveness, and performance profiling.",
    phase: "PHASE_05",
  },
  {
    step: "/ 06",
    title: "EVOLVE",
    description:
      "Ongoing creative guardianship, brand evolution tooling, design system scalability, and ongoing optimization cycles.",
    phase: "PHASE_06",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "WHAT IS YOUR CURRENT COMMENCEMENT LEAD TIME?",
    answer:
      "Projects typically commence within 2-4 weeks depending on the existing scope and design system requirements.",
  },
  {
    id: 2,
    question: "DO YOU PROVIDE FULL TECHNICAL STACK IMPLEMENTATION?",
    answer:
      "Yes, full-stack implementation using React, Next.js, TypeScript, and Supabase is provided natively.",
  },
  {
    id: 3,
    question: "HOW DO YOU STRUCTURE PROJECT ENGAGEMENTS?",
    answer:
      "Engagements are structured into discovery, architecture, iterative design sprints, and full-scale deployment.",
  },
  {
    id: 4,
    question: "CAN YOU COLLABORATE WITH INTERNAL ENGINEERING TEAMS?",
    answer:
      "Seamless embedment within product and engineering teams via Slack, GitHub, and Figma workflows is standard.",
  },
];
