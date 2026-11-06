"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { INITIAL_INQUIRIES } from "@/constants";
import { Project, ProjectStatus, GithubRepo, Inquiry, AdminTab } from "@/types";
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
  const { isRepoLoading, fetchGithubRepositories, fetchGithubRepoDetails } =
    useGithubRepo();

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
   * GitHub 레포지토리의 상세 정보 가져오기
   * @param owner
   * @param repoName
   * @param token
   * @returns
   */
  /**
  const fetchGithubRepoDetails = async (
    owner: string,
    repoName: string,
    token: string,
  ) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      };

      // 레포지토리 단건 조회 (description, url 등 상세 데이터 포함)
      const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}`,
        { headers },
      );
      const repoData = await repoRes.json();

      // 주요 사용 언어 목록 조회 (GET /repos/{owner}/{repo}/languages)
      const langRes = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/languages`,
        { headers },
      );
      const langData = await langRes.json();
      // 객체의 열거 가능한 문자열 속성 반환: 배열
      // e.g. ["TypeScript", "SCSS", "HTML"]
      const languages = Object.keys(langData);

      return {
        pushed_at: repoData.pushed_at || repoData.updated_at,
        stars: repoData.stargazers_count || 0,
        description: repoData.description || "",
        languages: languages.length > 0 ? languages : ["Web Application"],
        github_url: repoData.github_url,
      };
    } catch (error) {
      console.error("Failed to fetch repo details:", error);
      return null;
    }
  };
   */

  /**
   * GitHub 레포지토리 목록 불러오기
   * @returns
   */
  /**
  const fetchGithubRepositories = async () => {
    setIsRepoLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.provider_token) {
        setIsGithubSessionExpiredModalOpen(true);
        return;
      }

      const response = await fetch(
        "https://api.github.com/user/repos?type=public&sort=updated&per_page=100",
        {
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      if (!response.ok) {
        // 추가: HTTP 401/403 등 토큰 만료 응답인 경우도 모달 출력
        if (response.status === 401 || response.status === 403) {
          setIsGithubSessionExpiredModalOpen(true);
          return;
        }

        throw new Error("레포지토리 목록을 불러오는 데 실패했습니다.");
      }

      const data: GithubRepo[] = await response.json();
      setRepositories(data);
      setIsRepoModalOpen(true);
    } catch (error: any) {
      triggerToast(
        error.message || "레포지토리 목록 로드 중 오류가 발생했습니다.",
        "danger",
      );
    } finally {
      setIsRepoLoading(false);
    }
  };
   */

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

    // 선택한 레포지토리의 상세 데이터 패치
    const repoDetails = await fetchGithubRepoDetails(
      currentGithubId,
      repo.name,
      session.provider_token,
    );

    const categoryList: string[] = [];
    if (repoDetails?.languages && repoDetails.languages.length > 0) {
      categoryList.push(...repoDetails.languages.slice(0, 3));
    } else {
      categoryList.push("Web Application");
    }

    // 실제 Github API에서 가져온 데이터를 기반으로 Project 객체 생성
    const newProject: Project = {
      id: repo.id,
      title: repo.name,
      categories: categoryList,
      description:
        repoDetails?.description ||
        repo.description ||
        "GitHub 레포지토리로부터 임포트된 프로젝트입니다.",
      image_url:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      status: "PUBLISHED" as ProjectStatus,
      github_url: repoDetails?.github_url || repo.github_url || "",
      stars: repoDetails?.stargazers_count ?? repo.stargazers_count ?? 0,
      // 추가: 깃허브 계정 식별자
      github_id: currentGithubId,
      // 추가: GitHub REST API에서 제공하는 최근 커밋 시각
      pushed_at:
        repoDetails?.pushed_at || repo.pushed_at || new Date().toISOString(),
    };

    // Supabase DB에 Insert
    // 수정: .insert() 대신 .upsert() 사용하여 중복 레코드 처리
    const { error } = await supabase.from("projects").upsert([newProject]);
    if (error) {
      console.error("Supabase upsert error:", error);
      triggerToast(`DB 저장 실패: ${error.message}`, "danger");
      return;
    }

    await refetchProjects();
    setIsRepoModalOpen(false);
    triggerToast(`레포지토리가 성공적으로 아카이빙되었습니다!`, "success");
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
    fetchGithubRepositories,
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
