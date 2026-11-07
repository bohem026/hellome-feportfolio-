"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { ProjectWithRepo } from "@/types";

export function useDetailPage(id: string) {
  const supabase = createClient();
  const [project, setProject] = useState<ProjectWithRepo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          throw new Error("유효하지 않은 프로젝트 ID입니다.");
        }

        // Supabase INNER JOIN 쿼리: projects + repositories
        const { data, error: dbError } = await supabase
          .from("projects")
          .select(
            `
            *,
            repositories (
              id,
              repo_name,
              repo_url,
              stars,
              languages,
              pushed_at,
              commit_history,
              created_at
            )
          `,
          )
          .eq("id", numericId)
          .single();

        if (dbError) throw dbError;

        if (data) {
          const repoData = Array.isArray(data.repositories)
            ? data.repositories[0]
            : data.repositories;

          const formattedProject: ProjectWithRepo = {
            id: data.id,
            github_id: data.github_id,
            title: data.title,
            description: data.description,
            categories: data.categories || [],
            image_url: data.image_url,
            status: data.status,
            demo_url: data.demo_url,
            ai_summary: data.ai_summary,
            created_at: data.created_at,
            repository: repoData
              ? {
                  id: repoData.id,
                  repo_name: repoData.repo_name,
                  repo_url: repoData.repo_url,
                  stars: repoData.stars || 0,
                  languages: repoData.languages || [],
                  pushed_at: repoData.pushed_at,
                  commit_history: repoData.commit_history || [],
                  created_at: repoData.created_at,
                }
              : undefined,
          };

          setProject(formattedProject);
        }
      } catch (err: any) {
        console.error(`Fetch detail error for #${id}:`, err);
        setError(
          err.message || "프로젝트 세부 정보를 불러오는 데 실패했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProjectDetail();
    }
  }, [id, supabase]);

  return {
    project,
    isLoading,
    error,
  };
}
