"use client";

import { useState } from "react";
import { ToastType } from "@/components/Toast";

export function useHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastState, setToastState] = useState<{
    open: boolean;
    message: string;
    type: ToastType;
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const triggerToast = (message: string, type: ToastType = "success") => {
    setToastState({ open: true, message, type });
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({ ...prev, open: false }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    triggerToast("프로젝트 제안 모달 확인이 클릭되었습니다.", "warning");
  };

  return {
    isModalOpen,
    toastState,
    triggerToast,
    handleCloseToast,
    handleOpenModal,
    handleCloseModal,
    handleConfirmModal,
  };
}