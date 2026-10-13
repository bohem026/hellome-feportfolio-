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
      triggerToast(`GitHub 연동 에러: ${error.message}`, "danger");
    }
  };

  const handleOpenDisconnectModal = () => {
    setIsDisconnectModalOpen(true);
  };

  const handleCloseDisconnectModal = () => {
    setIsDisconnectModalOpen(false);
  };

  /**
   * Github OAuth 연동 해제
   */
  const handleDisconnectGithub = async () => {
    // 추가: 토스트 메세지 출력
    setIsDisconnectModalOpen(false);
    await supabase.auth.signOut();
    setIsGithubConnected(false);
    setGithubUser(null);
    triggerToast(
      "GitHub 계정 연동 및 아카이빙 데이터가 해제되었습니다.",
      "warning",
    );
  };

  /**
   * 인증 성공 처리
   */
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    if (isGithubConnected) {
      triggerToast("GitHub 계정이 성공적으로 연동되었습니다.", "success");
    }
  };

  /**
   * 인증 실패 처리 (경고 후 리다이렉트)
   * @param errorMsg
   */
  const handleAuthFailure = (errorMsg: string) => {
    setTimeout(() => {
      triggerToast(`${errorMsg} 메인 페이지로 이동합니다.`, "warning");
      router.push("/");
    }, 1200);
  };

  /**
   * 프로젝트 삭제 핸들러
   * @param id
   */
  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    triggerToast("프로젝트가 성공적으로 삭제되었습니다.", "success");
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

    triggerToast("프로젝트 게시 상태가 변경되었습니다.", "success");
  };

  /**
   * 문의 / 취업 제안 삭제 핸들러
   * @param id
   */
  const handleRemoveInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    triggerToast("취업 제안이 삭제되었습니다.", "success");
  };

  return {
    isAuthenticated,
    isAuthModalOpen,
    isGithubConnected,
    githubUser,
    isDisconnectModalOpen,
    toastState,
    projects,
    inquiries,
    activeTab,
    setActiveTab,
    triggerToast,
    handleCloseToast,
    handleConnectGithub,
    handleOpenDisconnectModal,
    handleCloseDisconnectModal,
    handleDisconnectGithub,
    handleAuthSuccess,
    handleAuthFailure,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  };
}
