"use client";

import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/common/useProjects";
import { Project } from "@/types";

export function useDetailPage(id: string) {
  const { fetchProjectById, isLoading, error } = useProjects({
    autoFetch: false,
  });
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadDetail = async () => {
      const data = await fetchProjectById(id);
      if (data) {
        setProject(data);
      }
    };

    loadDetail();
  }, [id, fetchProjectById]);

  return {
    project,
    isLoading,
    error,
  };
}
