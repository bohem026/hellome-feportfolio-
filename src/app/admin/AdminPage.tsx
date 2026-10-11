"use client";

import React from "react";
import { useAdminPage } from "@/hooks";
import { AdminAuthModal } from "@/components/AdminAuthModal";
import "./AdminPage.scss";

export function AdminPage() {
  const {
    isAuthenticated,
    isAuthModalOpen,
    projects,
    inquiries,
    activeTab,
    setActiveTab,
    handleAuthSuccess,
    handleAuthFailure,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  } = useAdminPage();

  return (
    <div className="admin-container">
      {/* 관리자 인증 모달 */}
      <AdminAuthModal
        isOpen={!isAuthenticated && isAuthModalOpen}
        onSuccess={handleAuthSuccess}
        onFailure={handleAuthFailure}
      />

      {/* 배경 레이아웃 (인증 미완료 시 스켈레톤 클래스 적용) */}
      <div
        className={`admin-layout ${!isAuthenticated ? "skeleton-mode" : ""}`}
      >
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
          <div className="console-bar">
            <span>[CONSOLE CONTROL V4.1] ● LIVE SYSTEM DISPATCH</span>
            <div className="console-actions">
              <button className="btn-outline">RE-INDEX CACHE</button>
              <button className="btn-solid">+ CREATE NEW WORK</button>
            </div>
          </div>

          <h1 className="page-title">EDITORIAL CMS.</h1>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="label">TOTAL IMPRESSIONS</span>
              <div className="value">{isAuthenticated ? "48.2K" : "•••••"}</div>
              <span className="sub">↑ +14.8% TREND</span>
            </div>
            <div className="metric-box">
              <span className="label">ACTIVE CASE STUDIES</span>
              <div className="value">
                {isAuthenticated ? projects.length : "••"}
              </div>
              <span className="sub">INDEXED & PUBLISHED</span>
            </div>
            <div className="metric-box">
              <span className="label">PENDING INQUIRIES</span>
              <div className="value">{isAuthenticated ? "07" : "••"}</div>
              <span className="sub">NEEDS REVIEW</span>
            </div>
            <div className="metric-box">
              <span className="label">RECRUITER INQUIRIES</span>
              <div className="value">
                {isAuthenticated ? inquiries.length : "••"}
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
                  {isAuthenticated
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
                    {isAuthenticated
                      ? projects.map((proj) => (
                          <tr key={proj.id}>
                            <td>
                              <img
                                src={proj.imageUrl}
                                alt={proj.title}
                                className="thumb"
                              />
                            </td>
                            <td>
                              <strong className="title">{proj.title}</strong>
                              <span className="id">
                                ID: {proj.id} // {proj.visibility}
                              </span>
                            </td>
                            <td>{proj.category}</td>
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
                      : /* 스켈레톤 행 렌더링 */
                        [1, 2, 3].map((idx) => (
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

            <div className="inquiries-queue-section">
              <div className="section-title-bar">
                <span>[INQUIRIES QUEUE]</span>
                <span className="live-dot">● LIVE STREAM</span>
              </div>

              <div className="queue-list">
                {isAuthenticated
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

export default AdminPage;
