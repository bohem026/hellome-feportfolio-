"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { INITIAL_INQUIRIES } from "@/constants";
import {
  Project,
  ProjectStatus,
  GithubRepo,
  GithubCommit,
  Inquiry,
  AdminTab,
} from "@/types";
import { useProjects, useGithubRepo } from "@/hooks";
import { ToastType } from "@/components/Toast";

export function useAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // 수정: useProjects 훅을 통해 프로젝트 상태 관리
  const {
    projects,
    setProjects,
    isLoading: isProjectsLoading,
    refetchProjects,
  } = useProjects({ autoFetch: false });
  const {
    isRepoLoading,
    fetchGithubRepositories,
    fetchGithubRepoDetails,
    fetchGithubRepoCommits,
  } = useGithubRepo();

  // 추가: 세션 로딩 상태(관리자 인증 모달 점멸 현상 방지)
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  // 관리자 로그인 세션 확인_ sessionStorage 기반
  // 수정: 스토리지 참조 전면 제거
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

  // Github OAuth 연동 상태
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [githubUser, setGithubUser] = useState<string | null>(null);

  // Github 관련 모달 상태
  const [isGithubDisconnectModalOpen, setIsGithubDisconnectModalOpen] =
    useState(false);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  // 추가: 깃허브 세션 만료 재인증 안내 모달 상태
  const [isGithubSessionExpiredModalOpen, setIsGithubSessionExpiredModalOpen] =
    useState(false);

  // GitHub 레포지토리 데이터 관련 상태
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

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

  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  const triggerToast = (message: string, type: ToastType = "success") => {
    setToastState({ isOpen: true, message, type });
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  // 실제 데이터 노출 조건: 관리자 인증 완료 & GitHub 연동 완료
  const isDataVisible = isAuthenticated && isGithubConnected;

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

          // 깃허브 세션 확인 시 admin_users 테이블 동기화 (PK 에러 방지)
          await supabase.from("admin_users").upsert([
            {
              github_id: username,
              github_name: username,
              avatar_url: session.user.user_metadata?.avatar_url || "",
            },
          ]);

          // 추가: 세션 확인 직후 DB 목록 조회 실행
          // 수정: 공통 훅의 refetchProjects()로 대체
          await refetchProjects();

          // OAuth 인증 직후 콜백(?connected=true)으로 들어온 경우 성공 처리
          const isJustConnected = searchParams.get("connected") === "true";
          // 추가: 깃허브 연동 승인과 함께 관리자 인증 세션도 함께 부여
          if (isJustConnected) {
            sessionStorage.setItem("admin_authenticated", "true");
            setIsAuthenticated(true);
            setIsAuthModalOpen(false);

            triggerToast(`GitHub 계정이 성공적으로 연동되었습니다!`, "success");
            // URL 쿼리 파라미터 클린업(?connected=true 제거)
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
  }, [searchParams, router, refetchProjects]);

  /**
   * 레포지토리 선택 후 아카이빙(프로젝트 등록) 실행
   * @param repo
   */
  const handleArchiveRepo = async (repo: GithubRepo) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // 추가: 세션 만료 시 재인증 유도
    if (!session || !session.provider_token) {
      setIsGithubSessionExpiredModalOpen(true);
      return;
    }

    const currentGithubId =
      session?.user?.user_metadata?.preferred_username ||
      githubUser ||
      "UNKNOWN";

    // 1. 레포 상세 메타데이터 및 커밋 이력 패치
    const targetRepoName = repo.repo_name || (repo as any).name;
    if (!targetRepoName) {
      triggerToast("레포지토리 이름을 찾을 수 없습니다.", "danger");
      return;
    }

    // admin_users 테이블 외래키 사전 등록 (FK 23503 에러 방지)
    const { error: userError } = await supabase.from("admin_users").upsert([
      {
        github_id: currentGithubId,
        github_name: currentGithubId,
        avatar_url: session?.user?.user_metadata?.avatar_url || "",
      },
    ]);

    if (userError) {
      console.error("admin_users upsert error:", userError);
      triggerToast(`유저 등록 실패: ${userError.message}`, "danger");
      return;
    }

    // 2. repositories 테이블 저장 (GithubRepo 매핑)
    let repoDetails = null;
    let commitHistory: GithubCommit[] = [];

    try {
      const [detailsResult, commitsResult] = await Promise.all([
        fetchGithubRepoDetails(
          currentGithubId,
          targetRepoName,
          session.provider_token,
        ),
        fetchGithubRepoCommits(
          currentGithubId,
          targetRepoName,
          session.provider_token,
        ),
      ]);
      repoDetails = detailsResult;
      commitHistory = commitsResult || [];
    } catch (apiError) {
      console.warn(
        "GitHub API Fetch Warning (Proceeding with defaults):",
        apiError,
      );
    }

    // 3. projects 테이블 데이터 매핑
    const categoryList: string[] = repoDetails?.languages?.slice(0, 3) || [
      "Web Application",
    ];

    const projectPayload: Project = {
      id: repo.id,
      github_id: currentGithubId,
      title: repoDetails?.repo_name || targetRepoName,
      description: "GitHub 레포지토리로부터 임포트된 프로젝트입니다.",
      categories: categoryList,
      image_url:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      status: "PUBLISHED" as ProjectStatus,
    };

    // Supabase DB에 Insert
    // 수정: .insert() 대신 .upsert() 사용하여 중복 레코드 처리
    const { error: projectError } = await supabase
      .from("projects")
      .upsert([projectPayload], { onConflict: "id" });

    if (projectError) {
      console.error("projects upsert error:", projectError);
      triggerToast(`프로젝트 DB 저장 실패: ${projectError.message}`, "danger");
      return;
    }

    // 4. repositories 테이블 데이터 매핑
    const repositoryPayload = {
      id: repo.id,
      github_id: currentGithubId,
      repo_name: repoDetails?.repo_name || targetRepoName,
      repo_url: repoDetails?.repo_url || repo.repo_url || "",
      stars: repoDetails?.stars ?? repo.stars ?? 0,
      languages: repoDetails?.languages || ["Web Application"],
      pushed_at:
        repoDetails?.pushed_at || repo.pushed_at || new Date().toISOString(),
      commit_history: commitHistory,
    };

    const { error: repoError } = await supabase
      .from("repositories")
      .upsert([repositoryPayload], { onConflict: "id" });

    if (repoError) {
      console.error("repositories upsert error details:", {
        message: repoError.message,
        details: repoError.details,
        hint: repoError.hint,
        code: repoError.code,
      });
      triggerToast(
        `레포지토리 DB 저장 실패: ${repoError.message} ${repoError.details || ""})`,
        "danger",
      );
      return;
    }

    await refetchProjects();
    setIsRepoModalOpen(false);
    triggerToast(`레포지토리가 성공적으로 아카이빙되었습니다!`, "success");
  };

  /**
   * GitHub 레포지토리 목록 불러오기 후 레포 목록 모달 오픈
   */
  const handleFetchAndOpenRepoModal = async () => {
    const data = await fetchGithubRepositories();
    if (data) {
      setRepositories(data);
      setIsRepoModalOpen(true);
    } else {
      // 세션이 만료되었거나 불러오기 실패 시 세션 만료 모달 띄우기
      setIsGithubSessionExpiredModalOpen(true);
    }
  };

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
    setIsGithubDisconnectModalOpen(true);
  };

  const handleCloseDisconnectModal = () => {
    setIsGithubDisconnectModalOpen(false);
  };

  /**
   * Github OAuth 연동 해제
   * 추가: Supabase DB 내 프로젝트 데이터 전체 삭제 후 로그아웃 처리
   */
  const handleConfirmDisconnectGithub = async () => {
    setIsGithubDisconnectModalOpen(false);

    // 추가
    await supabase.from("projects").delete().neq("id", "");
    await supabase.auth.signOut({ scope: "global" });

    setIsGithubConnected(false);
    setGithubUser(null);
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
    setProjects([]);

    triggerToast("GitHub 계정 연동이 해제되었습니다.", "success");
  };

  /**
   * 깃허브 세션 만료 모달 확인 버튼 핸들러
   */
  const handleConfirmReconnectGithub = () => {
    setIsGithubSessionExpiredModalOpen(false);
    handleConnectGithub();
  };

  /**
   * 깃허브 세션 만료 모달 취소 버튼 핸들러
   * 재인증을 거부했으므로 깃허브 연동 해제 진행
   */
  const handleCancelReconnectGithub = async () => {
    setIsGithubSessionExpiredModalOpen(false);
    await handleConfirmDisconnectGithub();
  };

  /**
   * 인증 성공 처리
   * 수정: 리엑트 메모리 상에서만 인증 상태 보관 (sessionStorage 제거)
   */
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);

    if (isGithubConnected && githubUser) {
      refetchProjects();
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
  const handleDeleteProject = async (id: number) => {
    try {
      // Supabase DB에서 프로젝트 삭제
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) {
        throw error;
      }

      // 프론트엔드 상태에서도 삭제
      setProjects((prev) => prev.filter((p) => p.id !== id));
      triggerToast("프로젝트가 삭제되었습니다.", "success");

      // DB 최신화
      await refetchProjects();
    } catch (error: any) {
      console.error("Failed to delete project:", error);
      triggerToast(error.message || "프로젝트 삭제 실패", "danger");
    }
  };

  /**
   * 프로젝트 상태 토글 (PUBLISHED <-> DRAFT)
   * @param id
   */
  const handleToggleStatus = async (id: number) => {
    const targetProject = projects.find((p) => p.id === id);
    if (!targetProject) {
      return;
    }

    const nextStatus =
      targetProject.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    try {
      // DB 상태 업데이트
      const { error } = await supabase
        .from("projects")
        .update({ status: nextStatus })
        .eq("id", id);

      if (error) throw error;

      // UI 및 공통 훅 데이터 재갱신
      await refetchProjects();
      triggerToast("프로젝트 게시 상태가 변경되었습니다.", "success");
    } catch (error: any) {
      console.error("Failed to toggle status:", error);
      triggerToast("게시 상태 변경 실패", "danger");
    }
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
    isDataVisible,
    githubUser,
    isGithubDisconnectModalOpen,
    isGithubSessionExpiredModalOpen,
    isRepoModalOpen,
    setIsRepoModalOpen,
    repositories,
    isRepoLoading,
    selectedRepo,
    setSelectedRepo,
    toastState,
    projects,
    isProjectsLoading,
    inquiries,
    activeTab,
    setActiveTab,
    triggerToast,
    handleCloseToast,
    handleConnectGithub,
    fetchGithubRepositories: handleFetchAndOpenRepoModal,
    handleArchiveRepo,
    handleOpenDisconnectModal,
    handleCloseDisconnectModal,
    handleConfirmDisconnectGithub,
    handleConfirmReconnectGithub,
    handleCancelReconnectGithub,
    handleAuthSuccess,
    handleAuthFailure,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
    refetchProjects,
  };
}
