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

export const ENGINEERING_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "주로 어떤 기술 스택과 프론트엔드 아키텍처를 지향하나요?",
    answer:
      "React, Next.js(App Router), TypeScript를 주력으로 사용하며, 예측 가능한 단방향 데이터 흐름과 엄격한 타입 안정성을 최우선으로 설계합니다. 스타일링은 모듈형 SCSS/CSS 토큰 시스템을 기반으로 1px 그리드 규율과 WCAG 웹 접근성, Lighthouse 성능 기준을 준수합니다.",
  },
  {
    id: 2,
    question: "백엔드 설계 및 AI 워크플로우도 구현하시나요?",
    answer:
      "프론트엔드 UI 구현을 넘어 Supabase 기반의 PostgreSQL 스키마 설계, Row Level Security(RLS) 권한 제어, Serverless Edge Functions 구축까지 엔드투엔드로 다룹니다. 또한 OpenAI API를 연동해 문서 요약, 데이터 자동 분류, 실시간 챗봇 등의 자동화 파이프라인을 프로덕션 환경에 통합한 경험이 있습니다.",
  },
  {
    id: 3,
    question: "프로젝트별 상세 구현 내용은 어디서 확인하나요?",
    answer:
      "여기를 클릭하시면, 각 프로젝트의 상세 명세와 트러블슈팅 리포트는 물론 실시간 커밋 히스토리 및 기술 태그를 직접 확인하실 수 있습니다.",
  },
  {
    id: 4,
    question: "현재 채용 포지션 제안이나 프로젝트 협업 문의가 가능한가요?",
    answer:
      "현재 프론트엔드 엔지니어 포지션 합류 및 프로덕트 협업 제안 모두 열려 있습니다. 여기를 클릭하시면, 협업 제안 도우미 챗봇으로 연결됩니다.",
  },
];
