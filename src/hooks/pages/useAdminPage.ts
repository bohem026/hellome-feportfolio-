"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from "@/constants";
import { Project, Inquiry, AdminTab } from "@/types";
import { ToastType } from "@/components/Toast";

export function useAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // 추가: 세션 로딩 상태(관리자 인증 모달 점멸 현상 방지)
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 로그인 세션 확인_ 탭/브라우저 닫으면 자동 삭제됨
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_authenticated") === "true";
    }
    return false;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

  // Github OAuth 연동 상태
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [githubUser, setGithubUser] = useState<string | null>(null);

  // Github OAuth 연동 해제 모달 상태
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
   * 추가: Supabase Auth 세션 검수 및 OAuth 복귀 시 인증 기능 핸들링
   */
  useEffect(() => {
    const checkGithubSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session && session.user) {
          const username =
            session.user.user_metadata?.preferred_username ||
            session.user.email ||
            "CONNECTED";

          setIsGithubConnected(true);
          setGithubUser(username);

          // GitHub 연동 계정이 존재하면 어드민 인증 통과
          setIsAuthenticated(true);
          setIsAuthModalOpen(false);

          // OAuth 인증 직후 콜백(?connected=true)으로 들어온 경우 토스트 출력
          const isJustConnected = searchParams.get("connected") === "true";
          if (isJustConnected) {
            triggerToast(`GitHub 계정이 성공적으로 연동되었습니다!`, "success");
            // URL Clean-up(쿼리 파라미터 제거)
            router.replace("/admin", { scroll: false });
          }
        } else {
          setIsGithubConnected(false);
          setGithubUser(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        // 추가: 세션 점검 완료 후 로딩 해제(인증 모달 점멸 방지)
        setIsAuthLoading(false);
      }
    };

    checkGithubSession();
  }, [searchParams, router]);

  /**
   * Github OAuth 연동 요청
   * 추가: 재연동 시 모달 강제 팝업
   */
  const handleConnectGithub = async () => {
    // 연동 성공 시 리다이렉팅하면서 관리자 권한 재요청 무시하기 위함
    // sessionStorage.removeItem("github_connect_noticed");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:user",
        // 추가: 연동 성공 후 콜백 시 ?connected=true 쿼리 파라미터를 붙여서 토스트 출력
        redirectTo: `${window.location.origin}/api/auth/github/callback?next=/admin?connected=true`,
        // 추가: 기존 GitHub 자동 로그인 쿠키를 무시하고 모달을 강제로 띄움
        queryParams: {
          prompt: "consent",
        },
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
  const handleConfirmDisconnectGithub = async () => {
    setIsDisconnectModalOpen(false);

    await supabase.auth.signOut({ scope: "global" });

    // 세션 스토리지 클리어
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }

    setIsGithubConnected(false);
    setGithubUser(null);

    triggerToast("GitHub 계정 연동이 해제되었습니다.", "success");
  };

  /**
   * 인증 성공 처리
   */
  const handleAuthSuccess = () => {
    // 추가: 관리자 인증 성공 시 sessionStorage에 등록
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin_authenticated", "true");
    }

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
      triggerToast(`${errorMsg}\n메인 페이지로 이동합니다.`, "warning");
      router.push("/");
    }, 1200);
  };

  /**
   * 프로젝트 삭제 핸들러
   * @param id
   */
  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    triggerToast("프로젝트가 삭제되었습니다.", "success");
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
    isAuthLoading,
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
    handleConfirmDisconnectGithub,
    handleAuthSuccess,
    handleAuthFailure,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  };
}
