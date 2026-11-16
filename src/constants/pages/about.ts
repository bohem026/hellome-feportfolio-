import { TechCraftItem, MilestoneItem } from "@/types";

export const ABOUT_PROFILE = {
  koreanName: "주후산",
  englishName: "JOO HU SAN",
  roleTitle: "JUNIOR FRONTEND ENGINEER & CREATIVE ARCHITECT",
  statusBadge: "OPEN TO WORK // FRONTEND & FULLSTACK ROLES",
  locationBadge: "SEOUL, KR — AVAILABLE FOR COLLABORATION",
  avatarUrl: "/images/profile.jpg", // public/images/profile.jpg 경로에 로컬 이미지 배치
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