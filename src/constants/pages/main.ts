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

/* ==========================================================================
   BELOW: CONSTANTS FOR MAIN SECTION RENEWAL
   ========================================================================== */
export const KINETIC_KEYWORDS = [
  "RESILIENT",
  "SCALABLE",
  "INTERACTIVE",
  "MODULAR",
];

export const TECH_STACK_ITEMS = [
  { name: "REACT", slug: "react" },
  { name: "NEXT.JS", slug: "nextdotjs" },
  { name: "TYPESCRIPT", slug: "typescript" },
  { name: "JAVASCRIPT", slug: "javascript" },
  { name: "HTML5", slug: "html5" },
  { name: "SASS / SCSS", slug: "sass" },
  { name: "SUPABASE", slug: "supabase" },
  { name: "POSTGRESQL", slug: "postgresql" },
  { name: "NODE.JS", slug: "nodedotjs" },
  { name: "EXPRESS", slug: "express" },
  { name: "OPENAI API", slug: "openai" },
  { name: "MUI", slug: "mui" },
  { name: "D3.JS", slug: "d3" },
  { name: "DOCKER", slug: "docker" },
  { name: "GIT", slug: "git" },
  { name: "FIGMA", slug: "figma" },
];

export const DOSSIER_TERMINAL_ENTRIES = [
  {
    cmd: "$ whoami --role",
    text: "주후산 (Joo Husan) — Frontend Systems Engineer.\n사용자 경험의 디테일과 예측 가능한 데이터 아키텍처를 설계합니다.",
  },
  {
    cmd: "$ cat ./education/background.log",
    text: "홍익대학교 컴퓨터공학과 전공 및 이스트소프트(ESTsoft)\n오르미 프론트엔드 13기 과정 수료 · 실전 웹 서비스 설계 및 배포 주도.",
  },
  {
    cmd: "$ inspect --core-stack",
    text: "React · Next.js (App Router) · TypeScript · SCSS 모듈 시스템.\n1px 그리드 규율과 WCAG 웹 접근성·Lighthouse 성능 최적화를 지향합니다.",
  },
  {
    cmd: "$ run --serverless-ai-pipeline",
    text: "Supabase (PostgreSQL, Auth, RLS, Edge Functions) & OpenAI API.\n데이터 동기화부터 AI 자동 요약·실시간 응대 챗봇까지 엔드투엔드 구축.",
  },
];
