import { CommitCategory } from "@/types";

/**
 * 커밋 키워드 목록
 */
const TROUBLESHOOTING_KEYWORDS = [
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

export const KEYWORD_GROUP_MAP: Record<
  (typeof TROUBLESHOOTING_KEYWORDS)[number],
  Exclude<CommitCategory, "ALL" | "OTHER" | "MERGE">
> = {
  feat: "FEAT",
  fix: "FIX",
  bug: "FIX",
  solve: "FIX",
  resolved: "FIX",
  issue: "FIX",
  error: "FIX",
  conflict: "FIX",
  handle: "FIX",
  refactor: "REFACTOR",
  optimize: "REFACTOR",
  grant: "SECURITY",
  privilege: "SECURITY",
  permission: "SECURITY",
};
