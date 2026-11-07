"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { GithubRepo, GithubCommit } from "@/types";

export function useGithubRepo() {
  const supabase = createClient();
  const [isRepoLoading, setIsRepoLoading] = useState(false);

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
  }, []);

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
   * 특정 레포지토리의 최근 커밋 불러오기
   */
  const fetchGithubRepoCommits = useCallback(
    async (
      owner: string,
      repoName: string,
      token: string,
    ): Promise<GithubCommit[]> => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) return [];

        const data = await response.json();
        return data.map((item: any) => ({
          sha: item.sha.substring(0, 7),
          message: item.commit.message,
          date: item.commit.committer?.date || item.commit.author?.date,
          author: item.commit.author?.name || item.author?.login || "Unknown",
          url: item.html_url,
        }));
      } catch (error) {
        console.error("fetchGithubRepoCommits error:", error);
        return [];
      }
    },
    [],
  );

  return {
    isRepoLoading,
    fetchGithubRepositories,
    fetchGithubRepoDetails,
    fetchGithubRepoCommits,
  };
}
