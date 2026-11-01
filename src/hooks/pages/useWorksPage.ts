"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { ViewMode, Project } from "@/types";
import { useDebounce } from "../common/useDebounce";

export function useWorksPage() {
  const supabase = createClient();

  // Supabase 실시간 데이터 및 로딩
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 필터링 & UX
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Debounce: 검색어 입력 시 300ms Debounce 적용
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  /**
   * Supabase에서 PUBLISHED 상태의 프로젝트만 가져오기
   */
  useEffect(() => {
    const fetchPublishedProjects = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "PUBLISHED")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to fetch published projects:", error);
          return;
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
          }));

          setProjects(formattedProjects);
        }
      } catch (err) {
        console.error("Error fetching published projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedProjects();
  }, []);

  /**
   * DB 프로젝트들의 categories 태그를 기반으로 동적 카테고리 생성
   */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.flatMap((p) => p.categories || [])),
    );
    return ["ALL", ...uniqueCategories];
  }, [projects]);

  /**
   * 카테고리 필터링 + 디바운스 검색어 적용
   */
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 카테고리 매칭
      // categories 배열에 선택된 카테고리가 포함되는지
      const matchCategory =
        selectedCategory === 'ALL' ||
        project.categories?.includes(selectedCategory);

      // 검색어 매칭
      // 제목 또는 설명
      const query = debouncedSearchTerm.toLowerCase();
      const matchSearch =
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, debouncedSearchTerm]);

  return {
    isLoading,
    projects,
    filteredProjects,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    totalCount: projects.length,
  };
}
