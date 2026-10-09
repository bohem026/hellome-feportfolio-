"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { useHeader } from "@/hooks";
import "./Header.scss";

export function Header() {
  const pathname = usePathname();
  const {
    isModalOpen,
    toastState,
    triggerToast,
    handleCloseToast,
    handleOpenModal,
    handleCloseModal,
    handleConfirmModal,
  } = useHeader();

  const navLinks = [
    { name: "INDEX", href: "/" },
    { name: "WORKS", href: "/works" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT ASSISTANT", href: "/contact" },
    { name: "CMS CONSOLE", href: "/admin" },
  ];

  return (
    <>
      <header className="global-header">
        <div className="global-header__left">
          <Link href="/" className="logo">
            ARCH™
          </Link>
          <span className="sub-tag">
            ARCHIVE / EDITORIAL
            <br />
            SYS.REF 2026.09
          </span>
        </div>

        <nav className="global-header__nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="global-header__right">
          <span
            className="status-badge"
            style={{ cursor: "pointer" }}
            onClick={handleOpenModal}
          >
            ● AVAILABLE FOR Q3/Q4
          </span>

          <div className="user-profile">
            <span
              className="avatar"
              style={{ cursor: "pointer" }}
              onClick={() =>
                triggerToast(
                  "테스트 토스트 알림이 성공적으로 출력되었습니다!",
                  "success",
                )
              }
            >
              JH
            </span>
          </div>
        </div>
      </header>

      {/* 테스트용 */}
      <Modal
        isOpen={isModalOpen}
        title="시스템 가용성 안내"
        message="2026년 Q3/Q4 신규 프론트엔드 구축 및 디자인 시스템 파트너십 제안이 가능합니다. 계속 진행하시겠습니까?"
        confirmText="확인"
        cancelText="닫기"
        type="confirm"
        onConfirm={handleConfirmModal}
        onCancel={handleCloseModal}
      />

      {/* 테스트용 */}
      <Toast
        open={toastState.open}
        message={toastState.message}
        type={toastState.type}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default Header;
