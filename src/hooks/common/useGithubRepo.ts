"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  GithubRepo,
  GithubCommit,
  CommitCategory,
  ClassifiedCommit,
  AiTroubleshootingData,
} from "@/types";
import { TROUBLESHOOTING_KEYWORDS, KEYWORD_GROUP_MAP } from "@/constants";

export function useGithubRepo() {
  const supabase = createClient();
  const [isRepoLoading, setIsRepoLoading] = useState(false);
  const [isTroubleshootingLoading, setIsTroubleshootingLoading] =
    useState(false);

  /**
   * GitHub 레포지토리 목록 불러오기
   */
  const fetchGithubRepositories = useCallback(async (): Promise<
    GithubRepo[] | null
  > => {
    setIsRepoLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.provider_token) {
        return null;
      }

      const response = await fetch(
        "https://api.github.com/user/repos?type=public&sort=updated&per_page=100",
        {
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      if (!response.ok) return null;

      const data = await response.json();
      return data.map((repo: any) => ({
        id: repo.id,
        repo_name: repo.name,
        repo_url: repo.html_url || "",
        stars: repo.stargazers_count || 0,
        languages: [],
        pushed_at:
          repo.pushed_at || repo.updated_at || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("fetchGithubRepositories error:", error);
      return null;
    } finally {
      setIsRepoLoading(false);
    }
  }, [supabase]);

  /**
   * 특정 레포지토리의 상세 정보 불러오기
   */
  const fetchGithubRepoDetails = useCallback(
    async (
      owner: string,
      repoName: string,
      token: string,
    ): Promise<GithubRepo | null> => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        };

        // 레포 기본 정보
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}`,
          { headers },
        );
        if (!repoRes.ok) return null;
        const repoData = await repoRes.json();

        // 언어 스택 정보 (GET /repos/{owner}/{repo}/languages)
        const langRes = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}/languages`,
          { headers },
        );
        const langData = langRes.ok ? await langRes.json() : {};
        // 객체의 열거 가능한 문자열 속성 반환: 배열
        // e.g. ["TypeScript", "SCSS", "HTML"]
        const languages = Object.keys(langData);

        return {
          id: repoData.id,
          repo_name: repoData.name,
          repo_url: repoData.html_url || "",
          stars: repoData.stargazers_count || 0,
          languages: languages.length > 0 ? languages : ["Web Application"],
          pushed_at:
            repoData.pushed_at ||
            repoData.updated_at ||
            new Date().toISOString(),
        };
      } catch (error) {
        console.error("fetchGithubRepoDetails error:", error);
        return null;
      }
    },
    [],
  );

  /**
   * TROUBLESHOOTING_KEYWORDS를 재활용하여 커밋 메시지의 카테고리와 매칭 키워드를 추출
   */
  const classifyCommitWithKeywords = useCallback(
    (commit: GithubCommit): ClassifiedCommit => {
      const lower = commit.message.trim().toLowerCase();

      // 1. Merge 우선 판별
      if (
        lower.startsWith("merge pull request") ||
        lower.startsWith("merge branch") ||
        lower.startsWith("merge remote")
      ) {
        return {
          commit,
          category: "MERGE",
        };
      }

      // 2. 접두사 우선 매칭
      // 예: "feat:", "fix:", ...
      for (const kw of TROUBLESHOOTING_KEYWORDS) {
        const prefixRegex = new RegExp(`^${kw}(\\([^)]+\\))?:`, "i");
        if (prefixRegex.test(lower)) {
          return {
            commit,
            category: KEYWORD_GROUP_MAP[kw],
            matchedKeyword: kw.toUpperCase(),
          };
        }
      }

      // 3. 본문에 키워드가 포함된 경우 매칭
      for (const kw of TROUBLESHOOTING_KEYWORDS) {
        const wordRegex = new RegExp(`\\b${kw}\\b`, "i");
        if (wordRegex.test(lower)) {
          return {
            commit,
            category: KEYWORD_GROUP_MAP[kw],
            matchedKeyword: kw.toUpperCase(),
          };
        }
      }

      // 3. 그 외 일반 커밋 (README, style 등)
      return {
        commit,
        category: "OTHER",
      };
    },
    [],
  );

  /**
   * 특정 레포지토리의 최근 커밋 불러오기
   * 수정:
   * - 최대 100건 패칭
   * - 그룹화된 카테고리로 매핑
   */
  const fetchGithubRepoCommits = useCallback(
    async (
      owner: string,
      repoName: string,
      token: string,
    ): Promise<ClassifiedCommit[]> => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=100`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) return [];

        const data = await response.json();

        return data.map((item: any) => {
          const baseCommit: GithubCommit = {
            sha: item.sha.substring(0, 7),
            message: item.commit.message,
            date: item.commit.committer?.date || item.commit.author?.date,
            author: item.commit.author?.name || item.author?.login || "Unknown",
            url: item.html_url,
          };

          return classifyCommitWithKeywords(baseCommit);
        });
      } catch (error) {
        console.error("fetchGithubRepoCommits error:", error);
        return [];
      }
    },
    [],
  );

  /**
   * 특정 레포지토리의 README 파일 불러오기
   * @param owner
   * @param repo
   * @param token
   * @returns
   */
  const fetchGithubReadme = useCallback(
    async (
      owner: string,
      repo: string,
      token: string,
    ): Promise<string | null> => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/readme`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.raw+json",
            },
          },
        );

        if (!response.ok) return null;
        return await response.text();
      } catch (err) {
        console.warn("Failed to fetch README:", err);
        return null;
      }
    },
    [],
  );

  /**
   * GithubCommit 기반 커밋 키워드 필터링
   * 수정: 신규 ClassifiedCommit[] 구조와 기존 GithubCommit[] 구조 호환
   */
  const extractTroubleshootingCommits = useCallback(
    (commits: (ClassifiedCommit | GithubCommit)[]): GithubCommit[] => {
      if (!Array.isArray(commits)) return [];

      return commits
        .map((item) => ("commit" in item ? item.commit : item))
        .filter((commit) => {
          const msg = commit.message.toLowerCase();
          return TROUBLESHOOTING_KEYWORDS.some((keyword) =>
            msg.includes(keyword),
          );
        });
    },
    [],
  );

  /**
   * AI 트러블슈팅 데이터 생성
   * Edge Function: generate-ai-troubleshooting
   */
  const generateAiTroubleshooting = useCallback(
    async (
      repoName: string,
      commits: (ClassifiedCommit | GithubCommit)[],
    ): Promise<AiTroubleshootingData | null> => {
      setIsTroubleshootingLoading(true);

      try {
        const filteredCommits = extractTroubleshootingCommits(commits);

        // 근거가 될 커밋이 없으면 AI 호출 없이 바로 반환
        if (filteredCommits.length === 0) {
          return {
            hasData: false,
            message: "분석할 이슈/해결 관련 커밋 이력이 존재하지 않습니다.",
          };
        }

        const { data, error } = await supabase.functions.invoke(
          "generate-ai-troubleshooting",
          {
            body: {
              repoName,
              filteredCommits,
            },
          },
        );

        if (error) throw error;
        return data as AiTroubleshootingData;
      } catch (err: any) {
        console.error("Failed to generate AI troubleshooting:", err);
        return null;
      } finally {
        setIsTroubleshootingLoading(false);
      }
    },
    [extractTroubleshootingCommits, supabase],
  );

  return {
    isRepoLoading,
    isTroubleshootingLoading,
    fetchGithubRepositories,
    fetchGithubRepoDetails,
    fetchGithubRepoCommits,
    fetchGithubReadme,
    classifyCommitWithKeywords,
    extractTroubleshootingCommits,
    generateAiTroubleshooting,
  };
}
