"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ContactFormState, INITIAL_FORM_STATE } from "@/types";
import { ToastType } from "@/components/Toast";

export function useContactPage() {
  const [formData, setFormData] =
    useState<ContactFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast
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
   * 입력 필드값 변경 핸들러 함수
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  /**
   * 프리셋 템플릿 텍스트 자동 채우기 핸들러 함수
   * Quick Dispatch 액션 버튼 클릭 시 호출
   */
  const handleSelectQuickAction = useCallback((templateText: string) => {
    setFormData((prev) => ({
      ...prev,
      message: templateText,
    }));
  }, []);

  /**
   * 컨택트 메시지 유효성 검증
   */
  const validateForm = useCallback((): boolean => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      triggerToast("성함 및 직책을 입력해 주세요.", "warning");
      return false;
    }

    if (!trimmedEmail) {
      triggerToast("회신받을 이메일을 입력해 주세요.", "warning");
      return false;
    }

    // 이메일 정규식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      triggerToast("올바른 이메일 주소 형식이 아닙니다.", "warning");
      return false;
    }

    if (!trimmedMessage) {
      triggerToast("제안 및 문의 내용을 작성해 주세요.", "warning");
      return false;
    }

    // test
    // 글자 수 제한
    if (trimmedMessage.length < 10) {
      triggerToast(
        "상세한 확인을 위해 문의 내용을 10자 이상 입력해 주세요.",
        "warning",
      );
      return false;
    }

    return true;
  }, [formData, triggerToast]);

  /**
   * 폼 제출 핸들러
   */
  const handleSubmitInquiry = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // 이미 전송 중이면 중복 클릭 차단
      if (isSubmitting) return;

      // 유효성 검증 통과 실패 시 중단
      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        // test
        // 임시 네트워크 지연 시뮬레이션 (1.5초)
        // 추후 Supabase DB INSERT 및 Edge Function 호출로 교체 예정
        await new Promise((resolve) => setTimeout(resolve, 1500));

        triggerToast(
          "구직 및 협업 제안 메시지가 성공적으로 전송되었습니다. 확인 후 24시간 이내에 회신드리겠습니다!",
          "success",
        );

        // 전송 완료 후 입력 폼 초기화
        setFormData(INITIAL_FORM_STATE);
      } catch (error) {
        console.error("Dispatch error:", error);
        triggerToast(
          "메시지 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
          "danger",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, validateForm, triggerToast],
  );

  return {
    formData,
    isSubmitting,
    toastState,
    handleCloseToast,
    handleInputChange,
    handleSelectQuickAction,
    handleSubmitInquiry,
  };
}
