"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from "@/constants";
import { Project, Inquiry, AdminTab, GithubRepo } from "@/types";
import { ToastType } from "@/components/Toast";

export function useAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const pathname = usePathname();
  const supabase = createClient();

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
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);

  // GitHub 레포지토리 데이터 관련 상태
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [isRepoLoading, setIsRepoLoading] = useState(false);
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

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
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
  }, [searchParams, router]);

  /**
   * GitHub 레포지토리 목록 불러오기
   * @returns
   */
  const fetchGithubRepositories = async () => {
    setIsRepoLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.provider_token) {
        triggerToast("세션이 만료되었습니다. 다시 연동해 주세요.", "danger");
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

  /**
   * 레포지토리 선택 후 아카이빙(프로젝트 등록) 실행
   * @param repo
   */
  const handleArchiveRepo = async (repo: GithubRepo) => {
    const newProject: Project = {
      id: `proj_${repo.id}_${Date.now()}`,
      title: repo.name,
      category: repo.language || "Web Application",
      description:
        repo.description || "GitHub 레포지토리로부터 임포트된 프로젝트입니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      status: "PUBLISHED",
      githubUrl: repo.htmlUrl,
      stars: repo.stargazersCount,
    };

    // Supabase DB에 Insert
    const { error } = await supabase.from("projects").insert([newProject]);

    if (error) {
      triggerToast(`DB 저장 실패: ${error.message}`, "danger");
      return;
    }

    await fetchProjectsFromSupabase();
    setIsRepoModalOpen(false);
    triggerToast(
      `레포지토리가 성공적으로 아카이빙되었습니다!`,
      "success",
    );
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
    setIsDisconnectModalOpen(true);
  };

  const handleCloseDisconnectModal = () => {
    setIsDisconnectModalOpen(false);
  };

  /**
   * Github OAuth 연동 해제
   * 추가: Supabase DB 내 프로젝트 데이터 전체 삭제 후 로그아웃 처리
   */
  const handleConfirmDisconnectGithub = async () => {
    setIsDisconnectModalOpen(false);

    // 추가
    await supabase.from('projects').delete().neq('id', '');

    await supabase.auth.signOut({ scope: "global" });

    setIsGithubConnected(false);
    setGithubUser(null);
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
    setProjects([]);

    triggerToast("GitHub 계정 연동이 해제되었습니다.", "success");
  };

  /**
   * 인증 성공 처리
   * 수정: 리엑트 메모리 상에서만 인증 상태 보관 (sessionStorage 제거)
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
      triggerToast(`${errorMsg}\n메인 페이지로 이동합니다.`, "warning");
      router.push("/");
    }, 1200);
  };

  /**
   * Supabase DB로부터 프로젝트 목록 조회
   */
  const fetchProjectsFromSupabase = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const formattedProjects: Project[] = data.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        imageUrl: item.imageUrl,
        status: item.isPublished,
        githubUrl: item.githubUrl,
        stars: item.stars,
      }));
      setProjects(formattedProjects);
    }
  };

  // 2. [IMPORT FROM REPO] 실행 시 Supabase DB에 저장
  // const handleArchiveRepo = async (repo: GithubRepo) => {
  //   const newProjectData = {
  //     id: `proj_${repo.id}_${Date.now()}`,
  //     title: repo.name,
  //     category: repo.language || "Web Application",
  //     description:
  //       repo.description || "GitHub 레포지토리로부터 임포트된 프로젝트입니다.",
  //     image_url:
  //       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  //     status: "PUBLISHED",
  //     visibility: "PUBLIC",
  //     github_url: repo.html_url,
  //     stars: repo.stargazers_count,
  //   };

  //   // Supabase DB에 Insert
  //   const { error } = await supabase.from("projects").insert([newProjectData]);

  //   if (error) {
  //     triggerToast(`DB 저장 실패: ${error.message}`, "danger");
  //     return;
  //   }

  //   // 성공 시 목록 재조회
  //   await fetchProjectsFromSupabase();
  //   setIsRepoModalOpen(false);
  //   triggerToast(
  //     `[${repo.name}] 레포지토리가 성공적으로 DB에 아카이빙되었습니다!`,
  //     "success",
  //   );
  // };

  // 3. DISCONNECT 시 Supabase DB 데이터 전체 삭제 (선택 사항)
  // const handleConfirmDisconnectGithub = async () => {
  //   setIsDisconnectModalOpen(false);

  //   // Supabase DB 내 모든 프로젝트 데이터 삭제
  //   await supabase.from("projects").delete().neq("id", "");

  //   await supabase.auth.signOut({ scope: "global" });

  //   setIsGithubConnected(false);
  //   setGithubUser(null);
  //   setIsAuthenticated(false);
  //   setIsAuthModalOpen(true);
  //   setProjects([]); // 프론트 상태 비우기

  //   triggerToast(
  //     "GitHub 계정 연동 및 아카이빙 데이터가 모두 초기화되었습니다.",
  //     "success",
  //   );
  // };

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
    isDataVisible,
    githubUser,
    isDisconnectModalOpen,
    isRepoModalOpen,
    setIsRepoModalOpen,
    repositories,
    isRepoLoading,
    selectedRepo,
    setSelectedRepo,
    toastState,
    projects,
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
    handleAuthSuccess,
    handleAuthFailure,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  };
}
