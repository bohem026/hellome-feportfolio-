import { TechCraftItem, MilestoneItem } from "@/types";
import { TechStackIconKey } from "@/components/TechStackIcon";

export interface TimelineProjectItem {
  id: string;
  period: string;       // 진행 기간
  title: string;        // 프로젝트명
  type: string;         // 프로젝트 특성 태그
  role: string;         // 담당 역할
  summary: string;      // 한 줄 요약
}

export interface TimelineGroupItem {
  id: string;
  period: string;       // 활동 기간
  organization: string; // 기관명 또는 활동 구분
  subtitle: string;     // 과정명 또는 활동 성격
  badge: string;        // 상태/구분 배지
  projects: TimelineProjectItem[];
}

export const ABOUT_PROFILE = {
  koreanName: "주후산",
  englishName: "JOO HU SAN",
  roleTitle: "JUNIOR FRONTEND ENGINEER & CREATIVE ARCHITECT.",
  statusBadge: "OPEN TO WORK // FRONTEND & FULLSTACK ROLES",
  locationBadge: "SEOUL, KR — AVAILABLE FOR COLLABORATION",
  avatarUrl: "/images/profile-image.jpg",
  philosophyHeadline:
    "모듈형 CSS 아키텍처와 Next.js·Supabase 서버리스 파이프라인을 결합해 기획부터 데이터 자동화까지 설계하는 프론트엔드 개발자입니다.",
  philosophySub:
    "시맨틱 마크업과 디자인 토큰 시스템의 구조적 명료함을 바탕으로, 안정적인 상태 관리와 AI 기반 워크플로우 자동화를 프로덕트에 녹여냅니다.",
  metrics: {
    trainingPeriod: "02+ YEARS",
    trainingSub: "WEB & GAME DEV TRAINING",
    mainStack: "TS / REACT / NEXT.JS",
    sideStack: "SIDE: UNITY / UE5 / C++ / C#",
    timezone: "UTC+9",
    timezoneSub: "SEOUL, SOUTH KOREA",
  },
  contact: {
    email: "microbin98@gmail.com",
    githubUrl: "https://github.com/bohem026",
    blogUrl: "#", // 추후 기술 블로그 링크 추가 예정
    resumeUrl: "#", // 추후 이력서 PDF 링크 추가 예정
  },
};

/**
 * 주요 프로젝트 및 개발 연혁
 * 최신순 정렬
 */
export const EXPERIENCE_MILESTONES: MilestoneItem[] = [
  {
    id: "milestone-hellome",
    period: "2026.09 — PRESENT",
    organization: "PERSONAL PROJECT",
    title: "HelloMe — GitHub 레포지토리 AI 아카이빙 플랫폼",
    role: "SOLE DEVELOPER",
    category: "FULLSTACK & AI",
    highlights: [
      "Next.js App Router 및 Supabase(PostgreSQL, RLS, Edge Functions) 기반 서버리스 아키텍처 및 관리자 CMS 구축",
      "GitHub REST API 연동을 통한 레포지토리 메타데이터·커밋 이력 자동 동기화 파이프라인 구현",
      "OpenAI API 기반 README 요약 생성 및 실제 커밋 로그(Fact-based) 근거 트러블슈팅 리포트 자동화",
    ],
  },
  {
    id: "milestone-recipe",
    period: "2026.07.15 — 2026.08.21",
    organization: "이스트소프트 생성형 AI 앱 개발 프로젝트",
    title: "깃깔나는 레시피 — 생성형 AI 기반 맞춤형 레시피 & 스마트 쿠킹 플랫폼",
    role: "FRONTEND & BACKEND",
    category: "AI APPLICATION",
    highlights: [
      "사용자 조건 기반 동적 프롬프트 빌더 및 5단계 Multi-step Form 위저드·AI 생성 데이터 자동 채우기 구현",
      "LocalStorage 및 DB 연동을 통한 임시 저장(is_temp_saved) 복구 시스템과 부족 재료 장바구니 원클릭 담기 연계",
      "Supabase Storage 이미지 압축 전처리 및 Public URL DB 매핑 최적화",
    ],
  },
  {
    id: "milestone-rounz",
    period: "2026.05.29 — 2026.06.19",
    organization: "이스트소프트 웹 리뉴얼 프로젝트",
    title: "ROUNZ — 모바일 퍼스트 반응형 제품 상세 페이지 리뉴얼",
    role: "FRONTEND DEVELOPER",
    category: "UX / FRONTEND",
    highlights: [
      "비동기 데이터 파싱 및 다중 미디어 렌더링 파이프라인 구축",
      "JSON 파라미터 기반 사용자 비교 함수를 활용한 연관 데이터 선별·정렬 및 탭 메뉴 동적 부분 출력 구현",
      "URL 쿼리 파라미터 기반 페이지 간 제품 상태 송수신 기능 설계",
    ],
  },
  {
    id: "milestone-estsoft",
    period: "2026.05.06 — 2026.05.11",
    organization: "이스트소프트 웹 리뉴얼 프로젝트",
    title: "이스트소프트 교육 모집 웹페이지 메인 리뉴얼",
    role: "FRONTEND DEVELOPER / TEAM LEAD",
    category: "TEAM LEAD & UI",
    highlights: [
      "CTA 버튼 확대 배치, 종스크롤 중심 레이아웃 및 고정 퀵메뉴를 통한 끊김 없는 지원 전환 동선 구축",
      "모듈형 카드 UI 확장, 충분한 여백 확보 및 단계별 난이도 시각화로 정보 탐색 편의성과 가독성 극대화",
      "단색 배경 기반 미니멀 디자인과 직관적 인포그래픽을 적용해 핵심 콘텐츠 집중도 향상",
    ],
  },
];

export const EXPERIENCE_TIMELINE: TimelineGroupItem[] = [
  {
    id: "group-personal",
    period: "2026.09 — PRESENT",
    organization: "PERSONAL LAB & ARCHIVE",
    subtitle: "독립 개발 및 서버리스·AI 웹 아키텍처 연구",
    badge: "INDEPENDENT",
    projects: [
      {
        id: "proj-hellome",
        period: "2026.09 — PRESENT",
        title: "HelloMe",
        type: "APPLICATION",
        role: "FULLSTACK",
        summary:
          "GitHub 레포지토리 아카이빙 플랫폼",
      },
    ],
  },
  {
    id: "group-estsoft",
    period: "2026.04 — 2026.08",
    organization: "이스트소프트 (ESTSOFT)",
    subtitle: "오르미캠프 프론트엔드 13기 과정 수료 및 팀 프로젝트",
    badge: "BOOTCAMP & TEAM",
    projects: [
      {
        id: "proj-recipe",
        period: "2026.07.15 — 2026.08.21",
        title: "깃깔나는 레시피",
        type: "APPLICATION",
        role: "FULLSTACK",
        summary:
          "생성형 AI 맞춤형 레시피 & 스마트 쿠킹 플랫폼",
      },
      {
        id: "proj-rounz",
        period: "2026.05.29 — 2026.06.19",
        title: "웹 페이지 리뉴얼 프로젝트(2)",
        type: "RENEWAL",
        role: "FRONTEND",
        summary:
          "이스트소프트 아이웨어 플랫폼 ROUNZ 리뉴얼",
      },
      {
        id: "proj-estsoft-main",
        period: "2026.05.06 — 2026.05.11",
        title: "웹 페이지 리뉴얼 프로젝트(1)",
        type: "RENEWAL",
        role: "TEAM LEAD / FRONTEND",
        summary:
          "이스트소프트 교육 모집 메인 페이지 리뉴얼",
      },
    ],
  },
];

/**
 * 기술 스택 및 개발 역량
 */
export const TECH_CRAFTS: TechCraftItem[] = [
  {
    id: "craft-01",
    indexLabel: "01 // CORE FRAMEWORK",
    title: "REACT & NEXT.JS",
    description:
      "App Router 기반 라우팅 설계와 커스텀 훅(useGithubRepo, useProjects 등)을 활용해 UI 렌더링과 비즈니스 로직을 명확히 분리합니다.",
    tags: ["REACT", "NEXT.JS", "APP ROUTER", "CUSTOM HOOKS"],
  },
  {
    id: "craft-02",
    indexLabel: "02 // LANGUAGE & LOGIC",
    title: "TYPESCRIPT & JAVASCRIPT",
    description:
      "엄격한 인터페이스 정의와 비동기 API 데이터 파싱을 통해 런타임 안정성과 예측 가능한 상태 흐름을 구축합니다.",
    tags: ["TYPESCRIPT", "ES6+", "ASYNC PIPELINE", "REST API"],
  },
  {
    id: "craft-03",
    indexLabel: "03 // STYLING ARCHITECTURE",
    title: "MODULAR SCSS & CSS ARCHITECTURE",
    description:
      "CSS Custom Properties 토큰 시스템과 모듈형 유틸리티 구조를 설계해 일관된 Brutalist 고대비 반응형 인터페이스를 구현합니다.",
    tags: ["SCSS", "CSS VARIABLES", "RESPONSIVE", "DESIGN SYSTEM"],
  },
  {
    id: "craft-04",
    indexLabel: "04 // DATABASE & SECURITY",
    title: "SUPABASE & POSTGRESQL",
    description:
      "OAuth 소셜 인증, 관계형 테이블 외래키(FK) 무결성 설계 및 RLS(Row Level Security) 보안 정책을 활용한 서버리스 백엔드를 구축합니다.",
    tags: ["SUPABASE", "POSTGRESQL", "RLS", "OAUTH"],
  },
  {
    id: "craft-05",
    indexLabel: "05 // SERVERLESS & AI",
    title: "EDGE FUNCTIONS & AI PIPELINE",
    description:
      "Deno 런타임 환경에서 비밀키를 보호하며 GitHub 메타데이터와 OpenAI API를 연동하는 정형화된 JSON 데이터 자동화 파이프라인을 개발합니다.",
    tags: ["EDGE FUNCTIONS", "DENO", "OPENAI API", "PROMPT ENGINEERING"],
  },
  {
    id: "craft-06",
    indexLabel: "06 // WORKFLOW & GAME DEV",
    title: "GIT COLLABORATION & MULTI-DOMAIN",
    description:
      "GitHub API 연동 및 Figma 시안 기반 팀 스프린트 리딩 경험과 더불어, Unity·UE5·C++/C# 학습을 통해 폭넓은 소프트웨어 구조를 이해합니다.",
    tags: ["GIT / GITHUB", "FIGMA", "UNITY / UE5", "C++ / C#"],
  },
];

/**
 * 기술 스택 네임태그
 * 기술 스택 네임과 아이콘 매핑
 */
export interface SkillBadge {
  label: string;
  icon: TechStackIconKey;
  level?: "MAIN" | "SIDE";
}

/**
 * 기술 스택 카테고리
 * 각 카테고리별 기술 스택 그룹화
 */
export interface TechStackCategory {
  id: string;
  indexLabel: string;
  categoryName: string;
  skills: SkillBadge[];
}

export const TECH_STACK_GROUPS: TechStackCategory[] = [
  {
    id: "stack-frontend",
    indexLabel: "01 // FRONTEND & UI ARCHITECTURE",
    categoryName: "FRONTEND CORE",
    skills: [
      { label: "React", icon: "react", level: "MAIN" },
      { label: "Next.js", icon: "nextjs", level: "MAIN" },
      { label: "TypeScript", icon: "typescript", level: "MAIN" },
      { label: "JavaScript", icon: "javascript", level: "MAIN" },
      { label: "SCSS / CSS", icon: "scss", level: "MAIN" },
      { label: "HTML5 / CSS3", icon: "html5", level: "MAIN" },
    ],
  },
  {
    id: "stack-backend-ai",
    indexLabel: "02 // SERVERLESS & AI PIPELINE",
    categoryName: "BACKEND & AI",
    skills: [
      { label: "Supabase", icon: "supabase", level: "MAIN" },
      { label: "PostgreSQL", icon: "postgresql", level: "MAIN" },
      { label: "Edge Functions (Deno)", icon: "deno", level: "MAIN" },
      { label: "OpenAI API", icon: "openai", level: "MAIN" },
    ],
  },
  {
    id: "stack-workflow",
    indexLabel: "03 // COLLABORATION & DESIGN",
    categoryName: "TOOLS & WORKFLOW",
    skills: [
      { label: "Git / GitHub", icon: "github", level: "MAIN" },
      { label: "Figma", icon: "figma", level: "MAIN" },
    ],
  },
  {
    id: "stack-gamedev",
    indexLabel: "04 // MULTI-DOMAIN & GAME DEV",
    categoryName: "SIDE STACK",
    skills: [
      { label: "Unity 3D", icon: "unity", level: "SIDE" },
      { label: "Unreal Engine 5", icon: "unreal", level: "SIDE" },
      { label: "C++", icon: "cpp", level: "SIDE" },
      { label: "C#", icon: "csharp", level: "SIDE" },
    ],
  },
];