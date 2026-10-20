"use client";

import React from "react";
import { useAdminPage } from "@/hooks";
import { AdminAuthModal } from "@/components/AdminAuthModal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Toast } from "@/components/Toast";
import "./AdminPage.scss";
import { RepoImportModal } from "@/components/RepoImportModal";

export function AdminPage() {
  const {
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
    toastState,
    projects,
    inquiries,
    activeTab,
    setActiveTab,
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
  } = useAdminPage();

  return (
    <div className="admin-container">
      {/* 관리자 인증 모달 */}
      {/* 추가: 세션 검수가 끝난 경우에만 로그인 모달 팝업_ 점멸 현상 방지 */}
      {!isAuthLoading && (
        <AdminAuthModal
          isOpen={!isAuthenticated && isAuthModalOpen}
          onSuccess={handleAuthSuccess}
          onFailure={handleAuthFailure}
        />
      )}

      {/* GitHub 연동 해제 모달: 최고 단계 경고 */}
      <ConfirmModal
        isOpen={isDisconnectModalOpen}
        title="GITHUB ACCOUNT DISCONNECT"
        message="GitHub 연동이 해제됩니다. 연동이 해제되면 아카이빙 중인 레포지토리 목록도 즉시 초기화됩니다. 계속 진행하시겠습니까?"
        confirmText="UNLINK"
        cancelText="CANCEL"
        type="danger"
        onConfirm={handleConfirmDisconnectGithub}
        onCancel={handleCloseDisconnectModal}
      />

      {/* 레포지토리 가져오기 모달 */}
      <RepoImportModal
        isOpen={isRepoModalOpen}
        isLoading={isRepoLoading}
        repositories={repositories}
        onClose={() => setIsRepoModalOpen(false)}
        onArchive={handleArchiveRepo}
      />

      {/* Toast 알림 */}
      <Toast
        open={toastState.isOpen}
        message={toastState.message}
        type={toastState.type}
        onClose={handleCloseToast}
      />

      {/* 배경 레이아웃 (인증 미완료 시 스켈레톤 UI 적용) */}
      <div className={`admin-layout ${!isDataVisible ? "skeleton-mode" : ""}`}>
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <span className="sidebar-title">CMS OPERATING CORE</span>
          <ul>
            <li
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              [01] Overview
            </li>
            <li
              className={activeTab === "projects" ? "active" : ""}
              onClick={() => setActiveTab("projects")}
            >
              [02] Projects Library
            </li>
            <li
              className={activeTab === "inquiries" ? "active" : ""}
              onClick={() => setActiveTab("inquiries")}
            >
              [03] Client Inquiries
            </li>
          </ul>
        </aside>

        {/* Main Content Dashboard */}
        <main className="admin-main">
          {/* Console Bar */}
          <div className="console-bar">
            <div className="console-status">
              <span>[CONSOLE CONTROL V4.1]</span>

              {/* GitHub Status Badge */}
              {isGithubConnected ? (
                <span className="github-badge connected">
                  ● GITHUB: CONNECTED ({githubUser})
                </span>
              ) : (
                <span className="github-badge disconnected">
                  ○ GITHUB: DISCONNECTED
                </span>
              )}
            </div>

            <div className="console-actions">
              {/* GitHub Connect/Disconnect Button */}
              {isGithubConnected ? (
                <button
                  className="btn-outline disconnect"
                  onClick={handleOpenDisconnectModal}
                >
                  DISCONNECT GITHUB
                </button>
              ) : (
                <div className="connect-btn-wrapper">
                  {/* 연동 유도 말풍선 UI */}
                  {!isGithubConnected && isAuthenticated && (
                    <div className="speech-bubble top">
                      깃허브 계정을 연동하여 아카이빙을 시작
                      <span className="bubble-arrow" />
                    </div>
                  )}
                  <button
                    className="btn-outline connect"
                    onClick={handleConnectGithub}
                  >
                    CONNECT GITHUB
                  </button>
                </div>
              )}

              <button
                className="btn-solid"
                disabled={!isGithubConnected || isRepoLoading}
                onClick={fetchGithubRepositories}
              >
                {isRepoLoading ? "LOADING..." : "+ IMPORT FROM REPO"}
              </button>
            </div>
          </div>

          <h1 className="page-title">EDITORIAL CMS.</h1>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="label">TOTAL IMPRESSIONS</span>
              <div className="value">{isDataVisible ? "48.2K" : "•••••"}</div>
              <span className="sub">↑ +14.8% TREND</span>
            </div>
            <div className="metric-box">
              <span className="label">ACTIVE CASE STUDIES</span>
              <div className="value">
                {isDataVisible ? projects.length : "••"}
              </div>
              <span className="sub">INDEXED & PUBLISHED</span>
            </div>
            <div className="metric-box">
              <span className="label">PENDING INQUIRIES</span>
              <div className="value">{isDataVisible ? "07" : "••"}</div>
              <span className="sub">NEEDS REVIEW</span>
            </div>
            <div className="metric-box">
              <span className="label">RECRUITER INQUIRIES</span>
              <div className="value">
                {isDataVisible ? inquiries.length : "••"}
              </div>
              <span className="sub">JOB PROPOSALS</span>
            </div>
          </div>

          {/* Content Split: Projects Table & Inquiries Queue */}
          <div className="content-split">
            <div className="projects-management-section">
              <div className="section-title-bar">
                <span>[LIBRARY DISPATCH]</span>
                <span>
                  {isDataVisible
                    ? `${projects.length} ITEMS RECORDED`
                    : "RESTRICTED"}
                </span>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>PREVIEW</th>
                      <th>PROJECT DETAILS</th>
                      <th>CATEGORY</th>
                      <th>STATUS</th>
                      <th>MANAGEMENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isDataVisible
                      ? projects.map((proj) => (
                          <tr key={proj.id}>
                            <td>
                              <img
                                src={proj.image_url}
                                alt={proj.title}
                                className="thumb"
                              />
                            </td>
                            <td>
                              <strong className="title">{proj.title}</strong>
                              <span className="id">
                                ID: {proj.id} // {proj.status}
                              </span>
                            </td>
                            <td>
                              <div className="category-tags">
                                {Array.isArray(proj.categories) &&
                                  proj.categories.map((tag, idx) => (
                                    <span key={idx} className="tag-badge">
                                      {tag}
                                    </span>
                                  ))}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`status-badge-inline ${proj.status.toLowerCase()}`}
                              >
                                ● {proj.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-btns">
                                <button
                                  onClick={() => handleToggleStatus(proj.id)}
                                >
                                  상태변경
                                </button>
                                <button
                                  className="delete"
                                  onClick={() => handleDeleteProject(proj.id)}
                                >
                                  삭제
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : [1, 2, 3].map((idx) => (
                          <tr key={idx} className="skeleton-row">
                            <td>
                              <div className="skeleton-box thumb-box" />
                            </td>
                            <td>
                              <div className="skeleton-box text-box-long" />
                              <div className="skeleton-box text-box-short" />
                            </td>
                            <td>
                              <div className="skeleton-box text-box-short" />
                            </td>
                            <td>
                              <div className="skeleton-box badge-box" />
                            </td>
                            <td>
                              <div className="skeleton-box btn-box" />
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiries Queue Section */}
            <div className="inquiries-queue-section">
              <div className="section-title-bar">
                <span>[INQUIRIES QUEUE]</span>
                <span className="live-dot">● LIVE STREAM</span>
              </div>

              <div className="queue-list">
                {isDataVisible
                  ? inquiries.map((inq) => (
                      <div className="queue-card" key={inq.id}>
                        <div className="queue-top">
                          <span className="tag">{inq.timeAgo}</span>
                          <button
                            className="close-btn"
                            onClick={() => handleRemoveInquiry(inq.id)}
                          >
                            ×
                          </button>
                        </div>
                        <h3>{inq.sender}</h3>
                        <span className="role">{inq.role}</span>
                        <p className="msg">"{inq.message}"</p>
                      </div>
                    ))
                  : [1, 2].map((idx) => (
                      <div className="queue-card skeleton-card" key={idx}>
                        <div className="skeleton-box text-box-short" />
                        <div className="skeleton-box text-box-long" />
                        <div className="skeleton-box text-box-long" />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
