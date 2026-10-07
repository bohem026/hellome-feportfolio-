'use client';

import { useState } from 'react';
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from '@/constants';
import { Project, Inquiry, AdminTab } from '@/types';

export function useAdminPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // 프로젝트 삭제 핸들러
  const handleDeleteProject = (id: string) => {
    if (confirm('해당 프로젝트를 삭제하시겠습니까?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // 프로젝트 상태 토글 (PUBLISHED <-> DRAFT)
  const handleToggleStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // 문의 / 취업 제안 삭제 핸들러
  const handleRemoveInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  return {
    projects,
    inquiries,
    activeTab,
    setActiveTab,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  };
}