"use client";

import React from "react";
import Link from "next/link";
import {
  ABOUT_PROFILE,
  EXPERIENCE_TIMELINE,
  TECH_STACK_GROUPS,
} from "@/constants";
import { useAboutPage } from "@/hooks";
import { Toast } from "@/components/Toast";
import { TechStackIcon } from "@/components/TechStackIcon";
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
            <div className="portrait-badge">PROFILE IMAGE</div>
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
            {/* <span>SPEC METHODOLOGY // STRUCTURAL CLARITY</span> */}
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
      {/* 추가: 정보 간략화 */}
      <section className="about-milestone-section">
        <div className="section-header">
          <div>
            {/* <span className="section-index">02 // EXPERIENCE & TIMELINE</span> */}
            <h2>TIMELINE.</h2>
          </div>
          {/* <p className="section-desc">
            소속 기관 및 활동 기간별 주요 프로젝트 진행 흐름입니다. 세부 구현
            내역은{" "}
            <Link href="/works" className="inline-works-link">
              WORKS INDEX ↗
            </Link>
            에서 확인할 수 있습니다.
          </p> */}
        </div>

        <div className="timeline-groups">
          {EXPERIENCE_TIMELINE.map((group) => (
            <div key={group.id} className="timeline-group-card">
              {/* 좌측: 기관 및 전체 소속 기간 */}
              <div className="group-header-col">
                <div className="group-meta">
                  <span className="group-period">{group.period}</span>
                  <span className="group-badge">{group.badge}</span>
                </div>
                <h3 className="group-org">{group.organization}</h3>
                <p className="group-subtitle">{group.subtitle}</p>
              </div>

              {/* 우측: 수직 타임라인 트랙 & 하위 프로젝트 노드 */}
              <div className="group-track-col">
                {group.projects.map((proj) => (
                  <div key={proj.id} className="timeline-node">
                    <div className="node-marker" />
                    <div className="node-content">
                      <div className="node-top">
                        <span className="node-period">{proj.period}</span>
                        <div className="node-tags">
                          <span className="type-chip">{proj.type}</span>
                          <span className="role-chip">{proj.role}</span>
                        </div>
                      </div>
                      <h4 className="node-title">{proj.title}</h4>
                      <p className="node-summary">{proj.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNICAL CRAFT */}
      <section className="about-craft-section">
        <div className="section-header">
          <div>
            {/* <span className="section-index">03 // TECHNICAL STACK</span> */}
            <h2>CAPABLE TECHNOLOGIES.</h2>
          </div>
          {/* <p className="section-desc">
            프론트엔드·서버리스 메인 스택과 그 외 사이드 스택입니다.
          </p> */}
        </div>

        <div className="stack-category-grid">
          {TECH_STACK_GROUPS.map((group) => (
            <div key={group.id} className="stack-group-card">
              <div className="group-card-head">
                <span className="craft-index">{group.indexLabel}</span>
                <h3 className="group-title">{group.categoryName}</h3>
              </div>

              <div className="skill-badge-list">
                {group.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className={`skill-nametag ${
                      skill.level === "SIDE" ? "is-side" : ""
                    }`}
                  >
                    <TechStackIcon name={skill.icon} size={15} />
                    <span className="skill-name">{skill.label}</span>
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
