import { useState, useCallback } from "react";
import { ABOUT_PROFILE } from "@/constants";
import { useProjects } from "@/hooks";
import { ToastType } from "@/components/Toast";

export function useAboutPage() {
  const { projects, isLoading: isProjectsLoading } = useProjects();

  const [toastState, setToastState] = useState<{
    open: boolean;
    message: string;
    type: ToastType;
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const triggerToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToastState({ open: true, message, type });
    },
    [],
  );

  const handleCloseToast = useCallback(() => {
    setToastState((prev) => ({ ...prev, open: false }));
  }, []);

  /**
   * 이메일 주소 클립보드 복사 핸들러
   */
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ABOUT_PROFILE.contact.email);
      triggerToast(
        `이메일 주소가 복사되었습니다: ${ABOUT_PROFILE.contact.email}`,
        "success",
      );
    } catch {
      triggerToast("클립보드 복사에 실패했습니다.", "danger");
    }
  }, [triggerToast]);

  /**
   * 준비 중인 링크/기능 안내 핸들러
   */
  const handleComingSoon = useCallback(
    (e: React.MouseEvent, label: string) => {
      e.preventDefault();
      triggerToast(`${label} 기능은 현재 준비 중입니다.`, "warning");
    },
    [triggerToast],
  );

  // 아카이빙된 프로젝트 개수 포맷팅 (2자리 패딩)
  const archivedCountDisplay = isProjectsLoading
    ? "--"
    : String(projects.length).padStart(2, "0");

  return {
    archivedCountDisplay,
    toastState,
    handleCloseToast,
    handleCopyEmail,
    handleComingSoon,
  };
}
