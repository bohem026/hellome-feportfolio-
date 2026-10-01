"use client";

import React, { useState } from "react";
import "./AdminPage.scss";

interface Project {
  id: string;
  title: string;
  category: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  visibility: string;
  imageUrl: string;
}

interface Inquiry {
  id: string;
  sender: string;
  role: string;
  message: string;
  timeAgo: string;
  status: "NEW" | "SCHEDULED" | "RESPONDED";
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: "01",
    title: "HUNTER YEANY RACING",
    category: "BRAND / WEB",
    status: "PUBLISHED",
    visibility: "PUBLIC / TIER 1",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "02",
    title: "VELOCE OS",
    category: "UI/UX / MOTION",
    status: "PUBLISHED",
    visibility: "PUBLIC / TIER 1",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "03",
    title: "WALKER AGENCY",
    category: "ART DIRECTION",
    status: "DRAFT",
    visibility: "PRIVATE / UNLISTED",
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80",
  },
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "req-1",
    sender: "Klara Lindqvist",
    role: "Talent Lead @ Aone Studios, Stockholm",
    message:
      "We reviewed the Veloce Racing case study. Seeking Design Director for Q4 European flagship digital revamp.",
    timeAgo: "NEW - 10M AGO",
    status: "NEW",
  },
  {
    id: "req-2",
    sender: "Marcus Vance",
    role: "Partner @ Pentagram NYC",
    message:
      "Confirmed sync for prospective collaborative pitch on global automotive client identity system.",
    timeAgo: "SCHEDULED - TOMORROW 15:00",
    status: "SCHEDULED",
  },
  {
    id: "req-3",
    sender: "Elena Rostova",
    role: "Head of Brand @ Ledger, Paris",
    message:
      "Initial NDA and rate deck dispatched. Waiting on security validation review.",
    timeAgo: "RESPONDED - 2D AGO",
    status: "RESPONDED",
  },
];

export function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "inquiries"
  >("overview");

  // 프로젝트 삭제 핸들러
  const handleDeleteProject = (id: string) => {
    if (confirm("해당 프로젝트를 삭제하시겠습니까?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // 프로젝트 상태 토글 (수정 시뮬레이션)
  const handleToggleStatus = (id: string) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
          return { ...p, status: nextStatus };
        }
        return p;
      }),
    );
  };

  // 취업 제안 및 문의 알림 삭제/보관 핸들러
  const handleRemoveInquiry = (id: string) => {
    setInquiries(inquiries.filter((i) => i.id !== id));
  };

  return (
    <div className="admin-container">
      {/* Top Header */}
      <header className="header">
        <div className="header__left">
          <span className="logo">ARCH™</span>
          <span className="sub-tag">ADMINISTRATION ARCHIVE</span>
        </div>
        <nav className="header__nav">
          <a href="/" className="nav-link">
            INDEX
          </a>
          <a href="/works" className="nav-link">
            WORKS
          </a>
          <a href="/about" className="nav-link">
            ABOUT
          </a>
          <a href="#contact" className="nav-link">
            CONTACT ASSISTANT
          </a>
          <a href="/admin" className="nav-link active">
            CMS CONSOLE
          </a>
        </nav>
        <div className="header__right">
          <span className="status-badge">● LIVE DISPATCH</span>
          <div className="user-profile">
            <span className="avatar">JH</span>
          </div>
        </div>
      </header>

      <div className="admin-layout">
        {/* Left Sidebar */}
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

          {/* Metrics Grid (방문자 수 및 조회수 동향) */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="label">TOTAL IMPRESSIONS</span>
              <div className="value">48.2K</div>
              <span className="sub">↑ +14.8% TREND</span>
            </div>
            <div className="metric-box">
              <span className="label">ACTIVE CASE STUDIES</span>
              <div className="value">{projects.length}</div>
              <span className="sub">INDEXED & PUBLISHED</span>
            </div>
            <div className="metric-box">
              <span className="label">PENDING INQUIRIES</span>
              <div className="value">07</div>
              <span className="sub">NEEDS REVIEW</span>
            </div>
            <div className="metric-box">
              <span className="label">RECRUITER INQUIRIES</span>
              <div className="value">{inquiries.length}</div>
              <span className="sub">JOB PROPOSALS</span>
            </div>
          </div>

          {/* Content Split: Projects Table & Inquiries Queue */}
          <div className="content-split">
            {/* Projects Library Table (게시물 관리 및 수정/삭제) */}
            <div className="projects-management-section">
              <div className="section-title-bar">
                <span>[LIBRARY DISPATCH]</span>
                <span>{projects.length} ITEMS RECORDED</span>
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
                    {projects.map((proj) => (
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
                            <button onClick={() => handleToggleStatus(proj.id)}>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiries Queue Sidebar / Panel (취업 제안 및 문의 알림 관리) */}
            <div className="inquiries-queue-section">
              <div className="section-title-bar">
                <span>[INQUIRIES QUEUE]</span>
                <span className="live-dot">● LIVE STREAM</span>
              </div>

              <div className="queue-list">
                {inquiries.map((inq) => (
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
                    <div className="queue-actions">
                      <button className="resp-btn">RESPOND</button>
                      <button
                        className="arch-btn"
                        onClick={() => handleRemoveInquiry(inq.id)}
                      >
                        ARCHIVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div>ATELIER MONOCHROME / ADMIN CONSOLE V4.1</div>
        <div>LAT 37.5665° N, LON 126.9780° E</div>
        <div>© 2026 ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}