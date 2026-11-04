"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useProjects, useDebounce } from "@/hooks";
import { ViewMode } from "@/types";

export function useWorksPage() {
  const router = useRouter();

  // Supabase 실시간 데이터 및 로딩
  // PUBLISHED 상태의 프로젝트만 가져오기
  const { projects, isLoading, error } = useProjects({ status: "PUBLISHED" });

  // 필터링 & UX
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Debounce: 검색어 입력 시 300ms Debounce 적용
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
        selectedCategory === "ALL" ||
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

  // 클릭 이벤트 추가 (세부 페이지로 이동)
  const handleCardClick = (id: number | string) => {
    router.push(`/works/${id}`);
  };

  return {
    isLoading,
    error,
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
    handleCardClick,
  };
}
