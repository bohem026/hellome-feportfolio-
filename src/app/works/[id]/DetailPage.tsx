"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useDetailPage } from "@/hooks/pages/useDetailPage";
import "./DetailPage.scss";

interface DetailPageProps {
  id: string;
}

export function DetailPage({ id }: DetailPageProps) {
  const { project, isLoading, error } = useDetailPage(id);
  const [activeTab, setActiveTab] = useState<
    "overview" | "trouble" | "commits"
  >("overview");

  // 로딩 상태 UI
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="detail-container">
          <div className="detail-loading">
            <p>LOADING PROJECT SPECIMEN #{id}...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 에러 또는 데이터 없음 UI
  if (error || !project) {
    return (
      <>
        <div className="detail-container">
          <div className="sub-action-bar">
            <Link href="/works" className="back-link">
              ← BACK TO INDEX
            </Link>
          </div>
          <div className="detail-error">
            <h2>SPECIMEN NOT FOUND</h2>
            <p>{error || "요청하신 프로젝트 정보를 찾을 수 없습니다."}</p>
          </div>
        </div>
      </>
    );
  }

  //   const formattedCreatedDate = project.created_at
  //     ? new Date(project.created_at).toISOString().split("T")[0]
  //     : "-";
  const formattedUpdatedDate = project.pushed_at
    ? new Date(project.pushed_at).toISOString().split("T")[0]
    : "-";

  return (
    <>
      <article className="detail-container">
        {/* 1. 세부 페이지 전용 서브 액션 바 */}
        <div className="sub-action-bar">
          <Link href="/works" className="back-link">
            ← BACK TO INDEX
          </Link>

          <div className="action-group">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn github-btn"
              >
                GITHUB REPO ↗
              </a>
            )}
          </div>
        </div>

        {/* 2. 히어로 헤더 섹션 */}
        <header className="detail-hero-header">
          <div className="hero-meta">
            <span className="ref-badge">SPECIMEN NO. #{project.id}</span>
            <span className="star-badge">★ {project.stars} STARS</span>
          </div>

          <h1 className="hero-title">{project.title}</h1>
          <p className="hero-subtitle">{project.description}</p>

          <div className="stack-tags">
            {project.categories.map((tag, idx) => (
              <span key={idx} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 3. 썸네일 & 퀵 메트릭스 격자 */}
        <section className="detail-visual-section">
          <div className="image-frame">
            <img src={project.image_url} alt={project.title} />
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="label">LAST UPDATED</span>
              <span className="val">{formattedUpdatedDate}</span>
            </div>
            <div className="metric-card">
              <span className="label">ARCHIVE STATUS</span>
              <span className="val">{project.status}</span>
            </div>
            <div className="metric-card">
              <span className="label">GITHUB ID</span>
              <span className="val">#{project.github_id || project.id}</span>
            </div>
            {/* <div className="metric-card">
              <span className="label">ARCHIVE DATE</span>
              <span className="val">{formattedCreatedDate}</span>
            </div> */}
          </div>
        </section>

        {/* 4. 탭 네비게이션 컨트롤 */}
        <section className="detail-tab-section">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              01 // OVERVIEW & FEATURES
            </button>
            <button
              className={`tab-btn ${activeTab === "trouble" ? "active" : ""}`}
              onClick={() => setActiveTab("trouble")}
            >
              02 // TROUBLESHOOTING
            </button>
            <button
              className={`tab-btn ${activeTab === "commits" ? "active" : ""}`}
              onClick={() => setActiveTab("commits")}
            >
              03 // COMMIT HISTORY
            </button>
          </div>

          {/* 탭 1: 개요 */}
          {activeTab === "overview" && (
            <div className="tab-content overview-panel">
              <div className="ai-summary-box">
                <div className="box-badge">PROJECT DESCRIPTION</div>
                <p className="summary-text">{project.description}</p>
              </div>

              <div className="features-list-box">
                <h3>REPOSITORY METADATA</h3>
                <ul>
                  <li>
                    <span className="bullet">●</span>
                    <span>
                      GitHub Repository: {project.github_url || "미연동"}
                    </span>
                  </li>
                  <li>
                    <span className="bullet">●</span>
                    <span>
                      등록 스택 / 카테고리: {project.categories.join(", ")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* 탭 2: 트러블슈팅 (AI 요약 파이프라인 연결 예정) */}
          {activeTab === "trouble" && (
            <div className="tab-content trouble-panel">
              <div className="trouble-card">
                <div className="trouble-header">
                  <span className="trouble-id">AI ANALYZING</span>
                  <h4 className="trouble-title">
                    기술적 도전 과제 및 트러블슈팅 파이프라인 대기 중
                  </h4>
                </div>
                <div className="trouble-body">
                  <p>
                    OpenAI API 분석을 통해 이 레포지토리의 커밋 이력 및 이슈
                    분석 데이터가 자동으로 채워질 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 탭 3: 커밋 이력 (AI 요약 파이프라인 연결 예정) */}
          {activeTab === "commits" && (
            <div className="tab-content commits-panel">
              <div className="ai-summary-box">
                <p className="summary-text">
                  GitHub API 커밋 히스토리 동기화 준비 중입니다.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 5. 하단 CTA 배너 */}
        <section className="detail-footer-banner">
          <div className="banner-info">
            <span className="sub-label">CONTINUE EXPLORING</span>
            <h2>READY TO SEE MORE WORKS?</h2>
          </div>
          <Link href="/works" className="cta-btn">
            RETURN TO WORKS INDEX →
          </Link>
        </section>
      </article>
    </>
  );
}
