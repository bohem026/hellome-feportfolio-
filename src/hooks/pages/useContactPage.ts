"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ContactFormState, INITIAL_FORM_STATE, ChatMessage } from "@/types";
import { ToastType } from "@/components/Toast";

export function useContactPage() {
  const [formData, setFormData] =
    useState<ContactFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Refs: 채팅창 자동 스크롤 및 자동 포커스 제어
  const chatViewportRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // 수정: 상수 메시지-> 메시지 변수로 갖도록 useState 정의
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init-welcome",
      sender: "bot",
      timestamp: "JUST NOW",
      text: "안녕하세요! 프론트엔드 엔지니어 주후산의 채용 어시스턴트 봇입니다. 입사/프로젝트 제안 또는 이력서 다운로드를 원하시면 아래 키워드를 클릭하시거나 메시지를 남겨주세요.",
    },
  ]);

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
   * 메시지가 추가되거나 봇 타이핑 상태가 바뀔 때마다 채팅창 최하단 자동 스크롤
   */
  useEffect(() => {
    const viewport = chatViewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages, isBotTyping]);

  /**
   * 현재 시간으로 채팅 타임스탬프 업데이트
   * @returns
   */
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * 채팅 입력 애니메이션
   * 0.65초 딜레이 적용_ 실제 타이핑 느낌 강조
   */
  const appendBotReplyWithDelay = useCallback(
    (
      botText: string,
      actionType?: ChatMessage["actionType"],
      delayMs = 650,
    ) => {
      setIsBotTyping(true);
      setTimeout(() => {
        setIsBotTyping(false);
        setChatMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            timestamp: getCurrentTimestamp(),
            text: botText,
            actionType,
          },
        ]);
      }, delayMs);
    },
    [],
  );

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
