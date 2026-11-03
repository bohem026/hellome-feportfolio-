import { CareerItem, TechCraftItem } from "@/types";

export const CAREER_HISTORY: CareerItem[] = [
  {
    period: "2024 — PRESENT",
    organization: "ESTSOFT ORMI FRONTEND",
    location: "SEOUL, KR",
    role: "Frontend Developer & Lead Trainee",
    description:
      "Architecting modern web applications using React, Next.js, and Supabase. Spearheading UI/UX implementations and state-driven components.",
    discipline: "ENGINEERING",
  },
  {
    period: "2023 — 2024",
    organization: "KROMATIK LABS",
    location: "SEOUL, KR",
    role: "Frontend Developer",
    description:
      "Developed high-performance web products, scalable component design systems, and responsive kinetic digital interfaces.",
    discipline: "DEVELOPMENT",
  },
  {
    period: "2022 — 2023",
    organization: "ATELIER STUDIO",
    location: "SEOUL, KR",
    role: "UI/UX Developer & Designer",
    description:
      "Created interactive prototype flows using Figma, connected backend services via Supabase, and managed deployment workflows on Vercel.",
    discipline: "DESIGN & UI",
  },
];

export const TECH_CRAFTS: TechCraftItem[] = [
  {
    id: "/01 // CORE ARCHITECTURE",
    category: "FRAMEWORK & ENGINE",
    title: "REACT & NEXT.JS",
    description:
      "Strict TypeScript integration, SSR/SSG rendering patterns, App Router architectures, and optimized client state structures.",
    tags: ["TYPESCRIPT", "NEXT.JS", "REACT", "TURBOPACK"],
  },
  {
    id: "/02 // STYLING & KINETICS",
    category: "UI & DESIGN SYSTEM",
    title: "SCSS & TAILWIND",
    description:
      "Architectural SCSS modularity, Swiss typographic layout grids, responsive design systems, and microsecond render paths.",
    tags: ["SCSS", "TAILWIND", "CSS MODULES", "FIGMA"],
  },
  {
    id: "/03 // BACKEND & DATABASE",
    category: "BAAS & AUTH",
    title: "SUPABASE & DATABASE",
    description:
      "Relational PostgreSQL setup, Row Level Security (RLS), real-time subscriptions, and secure OAuth/Email Auth flows.",
    tags: ["SUPABASE", "POSTGRESQL", "RLS", "REST API"],
  },
  {
    id: "/04 // AI INTEGRATION",
    category: "INTELLIGENCE & APIS",
    title: "OPENAI & STREAMING",
    description:
      "Integrating LLM workflows, automated portfolio format synthesis, streaming UI responses, and prompt engineering.",
    tags: ["OPENAI API", "VERCEL AI SDK", "NODE.JS"],
  },
  {
    id: "/05 // DEPLOYMENT & CI/CD",
    category: "INFRASTRUCTURE",
    title: "VERCEL & GIT WORKFLOW",
    description:
      "Automated Git version control, GitHub Collaboration workflows, Vercel cloud hosting, and environment management.",
    tags: ["VERCEL", "GIT", "GITHUB", "CI/CD"],
  },
  {
    id: "/06 // TOOLING & DOCS",
    category: "WORKFLOW & COLLAB",
    title: "FIGMA & NOTION",
    description:
      "Precision wireframing in Figma, interactive UX prototypes, and comprehensive technical wiki management in Notion.",
    tags: ["FIGMA", "NOTION", "SLACK", "VS CODE"],
  },
];
