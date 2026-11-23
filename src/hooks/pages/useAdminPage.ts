"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
// import { INITIAL_INQUIRIES } from "@/constants";
import {
  Project,
  ProjectStatus,
  GithubRepo,
  ClassifiedCommit,
  Inquiry,
  AdminTab,
} from "@/types";
import { useProjects, useGithubRepo } from "@/hooks";
import { ArchivingStep } from "@/components/RepoImportModal";
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
    generateAiTroubleshooting,
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

  // 프로젝트 수정 모달 상태
  // 수정 중인 프로젝트 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // 추가: 아코디언 상태
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(
    null,
  );

  // 추가: 전체 게시된 레포지토리 최신화 상태
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  const [isArchiving, setIsArchiving] = useState(false);
  const [archivingStep, setArchivingStep] = useState<ArchivingStep>("IDLE");

  const triggerToast = (message: string, type: ToastType = "success") => {
    setToastState({ isOpen: true, message, type });
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  // 실제 데이터 노출 조건
  // - projects 목록: 관리자 인증(isAuthenticated)만 통과하면 조회 가능
  // - inquiries 목록: 관리자 인증 + GitHub OAuth 세션 모두 필요
  const isDataVisible = isAuthenticated && isGithubConnected;

  /**
   * DB에서 제안 목록 최신순 조회
   */
  const fetchInquiries = useCallback(async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "fetchInquiries RLS/DB error:",
        error.message,
        error.details,
      );
      return;
    }

    if (data) {
      setInquiries(data as Inquiry[]);
    }
  }, [supabase]);

  /**
   * Supabase Auth 세션 체크
   * Github OAuth 연동 유무 확인
   * 추가: Supabase Auth 세션 검수 및 OAuth 복귀 시 인증 기능 핸들링
   */
  useEffect(() => {
    let isMounted = true;

    const syncSessionState = async (session: any) => {
      if (!isMounted) return;

      if (session && session.user) {
        const username =
          session.user.user_metadata?.preferred_username ||
          session.user.email ||
          "CONNECTED";

        setIsGithubConnected(true);
        setGithubUser(username);

        await supabase.from("admin_users").upsert([
          {
            github_id: username,
            github_name: username,
            avatar_url: session.user.user_metadata?.avatar_url || "",
          },
        ]);

        // OAuth 콜백(?connected=true) 복귀 시 관리자 인증 함께 활성화
        if (searchParams.get("connected") === "true") {
          setIsAuthenticated(true);
          setIsAuthModalOpen(false);
          triggerToast("GitHub 계정이 성공적으로 연동되었습니다!", "success");
          router.replace("/admin", { scroll: false });
        }
      } else {
        setIsGithubConnected(false);
        setGithubUser(null);
      }
      setIsAuthLoading(false);
    };

    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      syncSessionState(session);
    });

    // OAuth 리다이렉트 직후 쿠키 -> 클라이언트 세션 동기화 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSessionState(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [searchParams, router, supabase]);

  /**
   * 추가: 관리자 인증만 되어도 게시 중인 프로젝트 목록 로드
   */
  useEffect(() => {
    if (isAuthenticated) {
      refetchProjects();
    }
  }, [isAuthenticated, refetchProjects]);

  /**
   * GitHub OAuth 세션까지 확보되면 문의 목록 로드
   */
  useEffect(() => {
    if (isAuthenticated && isGithubConnected) {
      fetchInquiries();
    }
  }, [isAuthenticated, isGithubConnected, fetchInquiries]);

  /**
   * 레포지토리 선택 후 아카이빙 실행
   * @param repo
   */
  const handleArchiveRepo = async (repo: GithubRepo) => {
    setIsArchiving(true);
    setArchivingStep("SYNCING_REPO");

    try {
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
      let commitHistory: ClassifiedCommit[] = [];

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
        console.warn("GitHub API Fetch Warning:", apiError);
      }

      // 3. repositories 테이블 데이터 매핑
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
        console.error("repositories upsert error details:", repoError);
        triggerToast(
          `레포지토리 DB 저장 실패: ${repoError.message} ${repoError.details || ""})`,
          "danger",
        );
        return;
      }

      // 4. 커밋 이력 기반 AI 트러블슈팅 분석 생성
      setArchivingStep("GENERATING_AI");
      const aiTroubleshootingResult = await generateAiTroubleshooting(
        repoDetails?.repo_name || targetRepoName,
        commitHistory,
      );

      // 5. projects 테이블 데이터 매핑
      const categoryList: string[] = repoDetails?.languages?.slice(0, 3) || [
        "Web Application",
      ];

      // 추가: AI 트러블슈팅 결과 포함
      const projectPayload: Project = {
        id: repo.id,
        github_id: currentGithubId,
        title: repoDetails?.repo_name || targetRepoName,
        description: "GitHub 레포지토리로부터 임포트된 프로젝트입니다.",
        categories: categoryList,
        image_url:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        status: "PUBLISHED" as ProjectStatus,
        ai_summary: aiTroubleshootingResult,
      };

      // Supabase DB에 Insert
      // 수정: .insert() 대신 .upsert() 사용하여 중복 레코드 처리
      const { error: projectError } = await supabase
        .from("projects")
        .upsert([projectPayload], { onConflict: "id" });

      if (projectError) {
        console.error("projects upsert error:", projectError);
        triggerToast(
          `프로젝트 DB 저장 실패: ${projectError.message}`,
          "danger",
        );
        return;
      }

      setArchivingStep("COMPLETE");
      await refetchProjects();
      setIsRepoModalOpen(false);
      triggerToast(`레포지토리가 성공적으로 아카이빙되었습니다!`, "success");
    } catch (error: any) {
      console.error("handleArchiveRepo unexpected error:", error);
      triggerToast(
        `아카이빙 중 예상치 못한 오류가 발생했습니다: ${error.message || ""}`,
        "danger",
      );
    } finally {
      setIsArchiving(false);
      setArchivingStep("IDLE");
    }
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

    // await supabase.from("projects").delete().neq("id", "");
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
   * 프로젝트 수정 모달 오픈 핸들러
   * @param project
   */
  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  /**
   * 프로젝트 수정 모달 닫기 핸들러
   */
  const handleCloseEditModal = () => {
    setEditingProject(null);
    setIsEditModalOpen(false);
  };

  // 프로젝트 수정 핸들러 (Supabase DB 저장)
  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          title: updatedProject.title,
          description: updatedProject.description,
          categories: updatedProject.categories,
          image_url: updatedProject.image_url,
          status: updatedProject.status,
          demo_url: updatedProject.demo_url,
        })
        .eq("id", updatedProject.id);

      if (error) throw error;

      triggerToast("프로젝트 수정이 완료되었습니다.", "success");
      await refetchProjects();
    } catch (err: any) {
      console.error("Failed to update project:", err);
      triggerToast(`수정 실패: ${err.message}`, "danger");
    }
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
   * 게시된 레포지토리 최신화 핸들러
   * - 게시된 모든 레포지토리의 pushed_at 비교
   * - 새 커밋이 푸시된 레포지토리만 최신화
   */
  const handleSyncAllRepos = async () => {
    if (isSyncingAll) return;
    setIsSyncingAll(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.provider_token) {
        setIsGithubSessionExpiredModalOpen(true);
        return;
      }

      const currentGithubId =
        session.user.user_metadata?.preferred_username ||
        githubUser ||
        "UNKNOWN";

      // 현재 DB의 repositories 테이블에 저장된 레포지토리 속성값 조회
      const { data: dbRepos, error: dbFetchError } = await supabase
        .from("repositories")
        .select("id, repo_name, pushed_at, stars, repo_url, languages");

      if (dbFetchError) {
        throw new Error(`DB 레포지토리 조회 실패: ${dbFetchError.message}`);
      }

      if (!dbRepos || dbRepos.length === 0) {
        triggerToast("동기화할 아카이빙 레포지토리가 없습니다.", "warning");
        return;
      }

      const latestGithubRepos = await fetchGithubRepositories();
      if (!latestGithubRepos) {
        setIsGithubSessionExpiredModalOpen(true);
        return;
      }

      // 빠른 조회를 위해 Map으로 변환
      // key: repo.id
      const latestRepoMap = new Map(
        latestGithubRepos.map((repo) => [repo.id, repo]),
      );

      let updatedCommitsCount = 0;
      let updatedStarsOnlyCount = 0;

      // DB 레포지토리 순회하며 pushed_at 비교
      for (const dbRepo of dbRepos) {
        const latestRepo = latestRepoMap.get(dbRepo.id);
        if (!latestRepo) continue;

        const dbPushedTime = dbRepo.pushed_at
          ? new Date(dbRepo.pushed_at).getTime()
          : 0;
        const latestPushedTime = latestRepo.pushed_at
          ? new Date(latestRepo.pushed_at).getTime()
          : 0;

        const hasNewCommits = latestPushedTime > dbPushedTime;
        const hasStarsChanged = (latestRepo.stars ?? 0) !== (dbRepo.stars ?? 0);

        // Case A: 새 커밋이 푸시된 경우
        // -> 커밋 목록 + 상세 언어 + 메타데이터 갱신
        if (hasNewCommits) {
          const targetRepoName = latestRepo.repo_name || dbRepo.repo_name;

          const [detailsResult, latestCommits] = await Promise.all([
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

          const { error: updateError } = await supabase
            .from("repositories")
            .update({
              repo_name: detailsResult?.repo_name || targetRepoName,
              repo_url: detailsResult?.repo_url || latestRepo.repo_url,
              stars: detailsResult?.stars ?? latestRepo.stars ?? 0,
              languages: detailsResult?.languages || dbRepo.languages,
              pushed_at: latestRepo.pushed_at,
              commit_history: latestCommits,
            })
            .eq("id", dbRepo.id);

          if (!updateError) {
            updatedCommitsCount++;
          }
        }
        // Case B: 새 커밋은 없지만 Star 수만 바뀐 경우
        // -> stars만 갱신
        else if (hasStarsChanged) {
          const { error: starError } = await supabase
            .from("repositories")
            .update({
              stars: latestRepo.stars ?? 0,
            })
            .eq("id", dbRepo.id);

          if (!starError) {
            updatedStarsOnlyCount++;
          }
        }
      }

      // 결과 화면 & 리프레시
      if (updatedCommitsCount > 0 || updatedStarsOnlyCount > 0) {
        await refetchProjects();
        const summaryParts: string[] = [];
        if (updatedCommitsCount > 0) {
          summaryParts.push(`커밋 이력 ${updatedCommitsCount}건`);
        }
        if (updatedStarsOnlyCount > 0) {
          summaryParts.push(`메타데이터 ${updatedStarsOnlyCount}건`);
        }
        triggerToast(
          `동기화 완료: ${summaryParts.join(", ")}이 최신화되었습니다.`,
          "success",
        );
      } else {
        triggerToast("모든 레포지토리가 이미 최신 상태입니다.", "success");
      }
    } catch (err: any) {
      console.error("handleSyncAllRepos error:", err);
      triggerToast(
        `일괄 동기화 중 오류가 발생했습니다: ${err.message || ""}`,
        "danger",
      );
    } finally {
      setIsSyncingAll(false);
    }
  };

  /**
   * 제안 목록 선택 핸들러
   * - is_read 컬럼 패칭
   * - 선택한 경우 is_read 업데이트
   * - 아코디언 토글
   * @param inquiry
   * @returns
   */
  const handleToggleInquiryAccordion = async (inquiry: Inquiry) => {
    const isClosing = expandedInquiryId === inquiry.id;
    setExpandedInquiryId(isClosing ? null : inquiry.id);

    // 닫는 동작이거나 이미 읽음 상태면 DB 업데이트 생략
    if (isClosing || inquiry.is_read) return;

    // 낙관적 UI 업데이트 (즉시 폰트 색상 연하게 전환)
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === inquiry.id ? { ...item, is_read: true } : item,
      ),
    );

    const { error } = await supabase
      .from("inquiries")
      .update({ is_read: true })
      .eq("id", inquiry.id);

    if (error) {
      console.error("Failed to mark inquiry as read:", error);
    }
  };

  /**
   * 문의/취업 제안 삭제 핸들러
   * @param id
   */
  const handleRemoveInquiry = async (id: string) => {
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) {
      triggerToast(`삭제 실패: ${error.message}`, "danger");
      return;
    }

    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (expandedInquiryId === id) {
      setExpandedInquiryId(null);
    }
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
    isEditModalOpen,
    editingProject,
    toastState,
    projects,
    isProjectsLoading,
    inquiries,
    selectedInquiry,
    expandedInquiryId,
    activeTab,
    setActiveTab,
    isArchiving,
    archivingStep,
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
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdateProject,
    handleDeleteProject,
    handleToggleStatus,
    handleToggleInquiryAccordion,
    handleRemoveInquiry,
    refetchProjects,
  };
}
