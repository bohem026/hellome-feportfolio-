/* ==========================================================================
   프로젝트 및 레포지토리 관련 타입 정의
   ========================================================================== */
export type ProjectStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

/**
 * 사용자가 임의로 수정 가능한 프로젝트 타입
 */
export interface Project {
  id: number; // 프로젝트 ID (repositories.id와 1:1 매핑되는 PK/FK)
  github_id?: string; // 관리자 계정 식별자 (FK -> admin_users)
  title: string; // 포트폴리오 전시용 제목
  description: string; // 포트폴리오 전시용 설명/개요
  categories: string[]; // 포트폴리오 카테고리 태그
  image_url: string; // 대표 썸네일 이미지 URL
  status: ProjectStatus; // 게시 상태 토글
  demo_url?: string | null; // 라이브 데모 URL
  ai_summary?: AiTroubleshootingData | null; // OpenAI 기반 요약/트러블슈팅 데이터 (jsonb)
  created_at?: string; // 포트폴리오 등록일
}

/**
 * 레포지토리 메타데이터
 */
export interface GithubRepo {
  id: number;
  repo_name: string; // 저장소 원래 이름
  repo_url: string; // 저장소 Web URL
  stars: number; // Stargazers Count
  languages: string[]; // 주 사용 언어 스택 목록 (text[])
  commit_history?: GithubCommit[]; // 최근 10개 커밋 목록 (jsonb[])
  pushed_at: string; // 최근 커밋/Push 시각 (timestamptz)
  created_at?: string; // 레포 아카이빙 일시
}

/**
 * GitHub 커밋 정보
 */
export interface GithubCommit {
  sha: string;
  message: string;
  date: string;
  author: string;
  url: string;
}

/**
 * DB JOIN (projects + repositories) 타입
 */
export interface ProjectWithRepo extends Project {
  repository?: GithubRepo;
}

/* ==========================================================================
   트러블슈팅 관련 타입 정의
   ========================================================================== */

/**
 * 커밋 키워드 목록
 */
export const TROUBLESHOOTING_KEYWORDS = [
  "feat",
  "fix",
  "bug",
  "refactor",
  "solve",
  "resolved",
  "issue",
  "error",
  "conflict",
  "grant",
  "privilege",
  "permission",
  "handle",
  "optimize",
] as const;

/**
 * AI 트러블슈팅 데이터 타입 (JSON)
 */
export interface AiTroubleshootingData {
  hasData: boolean;
  issue_title?: string;
  challenges?: string[];
  solutions?: string[];
  key_learnings?: string[];
  message?: string;
}
