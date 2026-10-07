'use client';

import { useState, useMemo } from 'react';
import { ALL_WORKS, CATEGORIES } from '@/constants';
import { WorkProject, ViewMode } from '@/types';
import { useDebounce } from '../common/useDebounce';

export function useWorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 검색어 입력 시 300ms Debounce 적용
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredWorks = useMemo(() => {
    return ALL_WORKS.filter((work: WorkProject) => {
      const matchCategory =
        selectedCategory === 'ALL' || work.categoryTag === selectedCategory;
      const matchSearch =
        work.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        work.categoryLabel.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        work.year.includes(debouncedSearchTerm);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, debouncedSearchTerm]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    categories: CATEGORIES,
    filteredWorks,
    totalCount: ALL_WORKS.length,
  };
}