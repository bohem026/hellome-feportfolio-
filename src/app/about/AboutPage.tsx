"use client";

import React from "react";
import Link from "next/link";
import {
  ABOUT_PROFILE,
  EXPERIENCE_MILESTONES,
  TECHNICAL_CRAFTS,
} from "@/constants";
import { useAboutPage } from "@/hooks";
import { Toast } from "@/components/Toast";
import "./AboutPage.scss";

export function AboutPage() {
  const {
    archivedCountDisplay,
    toastState,
    handleCloseToast,
    handleCopyEmail,
    handleComingSoon,
  } = useAboutPage();

  return (
    <div className="about-container">
      {/* HERO & IDENTITY SECTION */}
      <section className="about-hero-section">
        <div className="hero-top-grid">
          <div className="hero-title-area">
            <div className="status-bar">
              <span className="status-dot">●</span>
              <span className="status-text">{ABOUT_PROFILE.statusBadge}</span>
            </div>

            <h1 className="hero-main-title">
              {ABOUT_PROFILE.englishName} ({ABOUT_PROFILE.koreanName}) — <br />
              {ABOUT_PROFILE.roleTitle}
            </h1>
          </div>

          {/* 로컬 프로필 이미지 카드 */}
          <div className="hero-portrait-card">
            <div className="portrait-badge">01 // PROFILE SPECIMEN</div>
            <div className="portrait-frame">
              <img
                src={ABOUT_PROFILE.avatarUrl}
                alt={`${ABOUT_PROFILE.koreanName} 프로필`}
              />
            </div>
          </div>
        </div>

        {/* PHILOSOPHY 영역 */}
        <div className="philosophy-box">
          <div className="philosophy-meta">
            <span>PHILOSOPHY & ENGINEERING APPROACH</span>
            <span>SPEC METHODOLOGY // STRUCTURAL CLARITY</span>
          </div>
          <p className="philosophy-lead">{ABOUT_PROFILE.philosophyHeadline}</p>
          <p className="philosophy-sub">{ABOUT_PROFILE.philosophySub}</p>
        </div>

        {/* 핵심 지표 그리드 */}
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">DEV TRAINING</span>
            <strong className="metric-value">
              {ABOUT_PROFILE.metrics.trainingPeriod}
            </strong>
            <span className="metric-sub">
              {ABOUT_PROFILE.metrics.trainingSub}
            </span>
          </div>

          <div className="metric-card">
            <span className="metric-label">ARCHIVED PROJECTS</span>
            <strong className="metric-value">{archivedCountDisplay}</strong>
            <span className="metric-sub">SYNCED VIA GITHUB API</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">CORE & SIDE STACK</span>
            <strong className="metric-value stack-val">
              {ABOUT_PROFILE.metrics.mainStack}
            </strong>
            <span className="metric-sub">
              {ABOUT_PROFILE.metrics.sideStack}
            </span>
          </div>

          <div className="metric-card">
            <span className="metric-label">TIMEZONE</span>
            <strong className="metric-value">
              {ABOUT_PROFILE.metrics.timezone}
            </strong>
            <span className="metric-sub">
              {ABOUT_PROFILE.metrics.timezoneSub}
            </span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & MILESTONES */}
      <section className="about-milestone-section">
        <div className="section-header">
          <div>
            <span className="section-index">02 // EXPERIENCE & MILESTONES</span>
            <h2>PROJECT TRAJECTORY</h2>
          </div>
          <p className="section-desc">
            기획부터 아키텍처 설계, 팀 리딩 및 AI 데이터 자동화 파이프라인까지
            직접 구축한 실전 개발 이력입니다.
          </p>
        </div>

        <div className="milestone-list">
          {EXPERIENCE_MILESTONES.map((item) => (
            <article key={item.id} className="milestone-row">
              <div className="col-period">
                <span className="period-text">{item.period}</span>
                <span className="category-badge">{item.category}</span>
              </div>

              <div className="col-org">
                <strong className="org-name">{item.organization}</strong>
                <span className="role-name">{item.role}</span>
              </div>

              <div className="col-detail">
                <h3 className="project-title">{item.title}</h3>
                <ul className="highlight-list">
                  {item.highlights.map((point, idx) => (
                    <li key={idx}>
                      <span className="bullet">▪</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TECHNICAL CRAFT */}
      <section className="about-craft-section">
        <div className="section-header">
          <div>
            <span className="section-index">03 // CORE COMPETENCIES</span>
            <h2>TECHNICAL CRAFT</h2>
          </div>
          <p className="section-desc">
            SPECIALIZED STACKS & ARCHITECTURAL CAPABILITIES
          </p>
        </div>

        <div className="craft-grid">
          {TECHNICAL_CRAFTS.map((craft) => (
            <div key={craft.id} className="craft-card">
              <span className="craft-index">{craft.indexLabel}</span>
              <h3 className="craft-title">{craft.title}</h3>
              <p className="craft-desc">{craft.description}</p>
              <div className="craft-tags">
                {craft.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="about-contact-section">
        <div className="contact-box">
          <div className="contact-main">
            <span className="section-index">04 // CONNECT & COLLABORATE</span>
            <h2>INITIATE A COLLABORATION.</h2>
            <p>
              프론트엔드 및 풀스택 웹 개발 포지션 제안, 혹은 기술적인 협업에
              대해 언제든 열려 있습니다.
            </p>

            <div className="cta-buttons">
              <Link href="/works" className="btn-primary">
                EXPLORE ARCHIVED WORKS →
              </Link>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCopyEmail}
              >
                COPY EMAIL
              </button>
              <a
                href={ABOUT_PROFILE.contact.resumeUrl}
                onClick={(e) => handleComingSoon(e, "이력서(PDF) 다운로드")}
                className="btn-text-link"
              >
                DOWNLOAD FULL CV (PDF — COMING SOON) ↗
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <span className="card-label">DIRECT ELECTRONIC DISPATCH</span>
            <div className="email-display">
              <span className="sub">PRIMARY INBOX</span>
              <strong className="email-address">
                {ABOUT_PROFILE.contact.email}
              </strong>
            </div>

            <div className="external-links">
              <a
                href={ABOUT_PROFILE.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB (@bohem026) ↗
              </a>
              <span>/</span>
              <a
                href={ABOUT_PROFILE.contact.blogUrl}
                onClick={(e) => handleComingSoon(e, "기술 블로그")}
              >
                TECH BLOG (COMING SOON) ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <Toast
        open={toastState.open}
        message={toastState.message}
        type={toastState.type}
        onClose={handleCloseToast}
      />
    </div>
  );
}
