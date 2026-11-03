"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Project } from "@/types";

export function useDetailPage(id: string) {
  const supabase = createClient();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProjectDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: dbError } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (dbError) {
          console.error("Failed to fetch project detail:", dbError);
          setError("프로젝트 정보를 불러오는 데 실패했습니다.");
          return;
        }

        if (data) {
          const formattedProject: Project = {
            id: data.id,
            title: data.title,
            categories: Array.isArray(data.categories)
              ? data.categories
              : [data.categories || "Web Application"],
            description: data.description || "등록된 프로젝트 설명이 없습니다.",
            image_url:
              data.image_url ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
            status: data.status,
            github_url: data.github_url || "",
            stars: data.stars || 0,
            github_id: data.github_id,
            // created_at: data.created_at,
            // updated_at: data.updated_at,
          };

          setProject(formattedProject);
        }
      } catch (err) {
        console.error("Error in fetchProjectDetail:", err);
        setError("알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  return {
    project,
    isLoading,
    error,
  };
}
