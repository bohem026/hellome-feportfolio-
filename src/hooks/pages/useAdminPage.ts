"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from "@/constants";
import { Project, Inquiry, AdminTab } from "@/types";
import { ToastType } from "@/components/Toast";

export function useAdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

  // Github OAuth 연동 상태
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [githubUser, setGithubUser] = useState<string | null>(null);

  // Disconnect Modal 상태
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  // Toast 메세지 상태
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    message: string;
    type: ToastType;
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  const triggerToast = (message: string, type: ToastType = "success") => {
    setToastState({ isOpen: true, message, type });
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  /**
   * Supabase Auth 세션 체크
   * Github OAuth 연동 유무 확인
   */
  useEffect(() => {
    const checkGithubSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setIsGithubConnected(true);
        setGithubUser(
          session.user.user_metadata?.preferred_username ||
            session.user.email ||
            "CONNECTED",
        );
        // 추가: OAuth 콜백 후 해당 페이지로 복귀 시 관리자 로그인 모달 스킵
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
      } else {
        setIsGithubConnected(false);
        setGithubUser(null);
      }
    };

    checkGithubSession();
  }, []);

  /**
   * Github OAuth 연동 요청
   */
  const handleConnectGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:user",
        redirectTo: `${window.location.origin}/api/auth/github/callback?next=/admin`,
      },
    });

    if (error) {
      alert(`GitHub 연동 에러: ${error.message}`);
    }
  };

  /**
   * Github OAuth 연동 해제
   */
  const handleDisconnectGithub = async () => {
    if (confirm("GitHub 연동을 해제하시겠습니까?")) {
      await supabase.auth.signOut();
      setIsGithubConnected(false);
      setGithubUser(null);
    }
  };

  /**
   * 인증 성공 처리
   */
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  /**
   * 인증 실패 처리 (경고 후 리다이렉트)
   * @param errorMsg
   */
  const handleAuthFailure = (errorMsg: string) => {
    setTimeout(() => {
      alert(`${errorMsg}\n메인 페이지로 이동합니다.`);
      router.push("/");
    }, 1200);
  };

  /**
   * 프로젝트 삭제 핸들러
   * @param id
   */
  const handleDeleteProject = (id: string) => {
    if (confirm("해당 프로젝트를 삭제하시겠습니까?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  /**
   * 프로젝트 상태 토글 (PUBLISHED <-> DRAFT)
   * @param id
   */
  const handleToggleStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
          return { ...p, status: nextStatus };
        }
        return p;
      }),
    );
  };

  /**
   * 문의 / 취업 제안 삭제 핸들러
   * @param id
   */
  const handleRemoveInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  return {
    isAuthenticated,
    isAuthModalOpen,
    isGithubConnected,
    githubUser,
    projects,
    inquiries,
    activeTab,
    setActiveTab,
    handleConnectGithub,
    handleDisconnectGithub,
    handleAuthSuccess,
    handleAuthFailure,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  };
}
