"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Project, ProjectStatus, ProjectWithRepo } from "@/types";

interface UseProjectsOptions {
  status?: ProjectStatus;
  autoFetch?: boolean;
}

export function useProjects(options: UseProjectsOptions = { autoFetch: true }) {
  const status = options?.status;
  const autoFetch = options?.autoFetch ?? true;

  const supabase = createClient();
  const [projects, setProjects] = useState<ProjectWithRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. 전체 또는 상태별 프로젝트 목록 Fetch
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (status) {
        query = query.ilike("status", status);
      }

      const { data, error: dbError } = await query;

      if (dbError) {
        throw dbError;
      }

      if (data) {
        const formattedProjects: Project[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          categories: Array.isArray(item.categories)
            ? item.categories
            : [item.categories || "Web Application"],
          description: item.description || "",
          image_url:
            item.image_url ||
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
          status: item.status,
          github_url: item.github_url || "",
          stars: item.stars || 0,
          github_id: item.github_id,
          pushed_at: item.pushed_at || item.updated_at,
        }));

        setProjects(formattedProjects);
      }
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message || "프로젝트 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  // 2. 단건(ID) 프로젝트 Fetch
  const fetchProjectById = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);

    try {
      // 오류 수정: string으로 넘어온 id를 Number 타입으로 변환
      const numericId = typeof id === "string" ? parseInt(id) : id;
      if (isNaN(numericId)) {
        throw new Error("유효하지 않은 프로젝트 ID입니다.");
      }

      const { data, error: dbError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", numericId)
        .single();

      if (dbError) {
        throw dbError;
      }

      if (data) {
        const formattedProject: Project = {
          id: data.id,
          title: data.title,
          categories: Array.isArray(data.categories)
            ? data.categories
            : [data.categories || "Web Application"],
          description: data.description || "",
          image_url:
            data.image_url ||
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
          status: data.status,
          github_url: data.github_url || "",
          stars: data.stars || 0,
          github_id: data.github_id,
          pushed_at: data.pushed_at || data.updated_at,
        } as Project;
        return formattedProject;
      }
      return null;
    } catch (err: any) {
      console.error(`Error fetching project #${id}:`, err);
      setError(err.message || "프로젝트 세부 정보를 불러오는 데 실패했습니다.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchProjects();
    }
  }, [autoFetch, fetchProjects]);

  return {
    projects,
    setProjects,
    isLoading,
    error,
    refetchProjects: fetchProjects,
    fetchProjectById,
  };
}
