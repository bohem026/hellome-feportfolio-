"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDetailPage } from "@/hooks";
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
      <div className="detail-container">
        <div className="detail-loading">
          <p>LOADING PROJECT SPECIMEN #{id}...</p>
        </div>
      </div>
    );
  }

  // 에러 또는 데이터 없음 UI
  if (error || !project) {
    return (
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
    );
  }

  // 레포지토리 하위 데이터 파싱
  const repo = project.repository;
  const starsCount = repo?.stars ?? 0;
  const githubRepoUrl = repo?.repo_url || "";
  const formattedPushedDate = repo?.pushed_at
    ? new Date(repo.pushed_at).toISOString().split("T")[0]
    : "-";
  const commitHistory = repo?.commit_history || [];

  return (
    <>
      <article className="detail-container">
        {/* 서브 액션 바 */}
        <div className="sub-action-bar">
          <Link href="/works" className="back-link">
            ← BACK TO INDEX
          </Link>

          <div className="action-group">
            {githubRepoUrl && (
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn github-btn"
              >
                GITHUB REPO ↗
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn demo-btn"
              >
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>

        {/* 히어로 헤더 섹션 */}
        <header className="detail-hero-header">
          <div className="hero-meta">
            <span className="ref-badge">SPECIMEN NO. #{project.id}</span>
            <span className="star-badge">★ {starsCount} STARS</span>
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

        {/* 썸네일 & 메트릭스 */}
        <section className="detail-visual-section">
          <div className="image-frame">
            <img src={project.image_url} alt={project.title} />
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="label">LAST PUSHED</span>
              <span className="val">{formattedPushedDate}</span>
            </div>
            <div className="metric-card">
              <span className="label">ARCHIVE STATUS</span>
              <span className="val">{project.status}</span>
            </div>
            <div className="metric-card">
              <span className="label">GITHUB ID</span>
              <span className="val">#{project.github_id || project.id}</span>
            </div>
          </div>
        </section>

        {/* 탭 네비게이션 */}
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
              03 // COMMIT HISTORY ({commitHistory.length})
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
                      GitHub Repository: {githubRepoUrl || "DISCONNECTED"}
                    </span>
                  </li>
                  {repo?.languages && (
                    <li>
                      <span className="bullet">●</span>
                      <span>Tech Stack: {repo.languages.join(", ")}</span>
                    </li>
                  )}
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
              {commitHistory.length === 0 ? (
                <div className="ai-summary-box">
                  <p className="summary-text">동기화된 커밋 이력이 없습니다.</p>
                </div>
              ) : (
                <div className="commits-timeline">
                  {commitHistory.map((commit, idx) => (
                    <div key={commit.sha || idx} className="commit-item">
                      <div className="commit-meta">
                        <span className="commit-sha">#{commit.sha}</span>
                        <span className="commit-date">
                          {new Date(commit.date).toLocaleString()}
                        </span>
                      </div>
                      <p className="commit-msg">{commit.message}</p>
                      <div className="commit-author">
                        <span>BY: {commit.author}</span>
                        {commit.url && (
                          <a
                            href={commit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="commit-link"
                          >
                            VIEW COMMIT ↗
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* 하단 CTA 배너 */}
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
