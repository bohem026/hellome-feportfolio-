"use client";

import React, { useState } from "react";
import "./AdminAuthModal.scss";

interface AdminAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onFailure: (errorMessage: string) => void;
}

export function AdminAuthModal({
  isOpen,
  onSuccess,
  onFailure,
}: AdminAuthModalProps) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // 미리 지정한 관리자 계정 검증 테스트 (추후 Supabase Auth / Env로 대체 가능)
    const TARGET_ID = process.env.NEXT_PUBLIC_ADMIN_ID || "admin";
    const TARGET_PW = process.env.NEXT_PUBLIC_ADMIN_PW || "1234";

    setTimeout(() => {
      if (adminId === TARGET_ID && password === TARGET_PW) {
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        const failMessage =
          "인증에 실패했습니다. 올바른 관리자 계정을 입력하세요.";
        setErrorMsg(failMessage);
        onFailure(failMessage);
      }
    }, 600); // 인증 처리감을 주기 위한 미세 지연
  };

  return (
    <div className="admin-auth-backdrop">
      <div className="admin-auth-window">
        <div className="auth-header">
          <span className="sys-badge">
            ● RESTRICTED AREA // CMS AUTHENTICATION
          </span>
          <span className="sec-level">SEC-LEVEL 01</span>
        </div>

        <div className="auth-body">
          <h2 className="auth-title">ADMINISTRATOR ACCESS</h2>
          <p className="auth-desc">
            시스템 관리자 콘솔 접근 권한이 필요합니다. 관리자 식별자 및 보안
            키를 입력해 주세요.
          </p>

          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="input-group">
              <label>ADMIN IDENTIFIER</label>
              <input
                type="text"
                placeholder="Enter Admin ID..."
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="input-group">
              <label>SECURITY KEY</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && <div className="auth-error-banner">⚠️ {errorMsg}</div>}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading
                ? "VERIFYING CREDENTIALS..."
                : "AUTHENTICATE & ENTER ➔"}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          <span>ATELIER MONOCHROME OS</span>
          <span>IP: LOGGED & ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
}