"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./DetailPage.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// 💡 세부 페이지 전용 목업 데이터
const MOCK_PROJECT_DETAIL = {
  id: 20260815,
  title: "깃깔나는 레시피 (Gik-Gkal Recipe)",
  subtitle:
    "AI-Powered Personalized Recipe Generator & Culinary Social Platform",
  categoryTags: [
    "React",
    "TypeScript",
    "OpenAI API",
    "Supabase",
    "Tailwind CSS",
  ],
  status: "PUBLISHED",
  stars: 128,
  forks: 24,
  createdAt: "2026-08-10",
  updatedAt: "2026-08-25",
  githubUrl: "https://github.com/bohem026/gik-gkal-recipe",
  demoUrl: "https://gik-gkal-recipe.vercel.app",
  heroImage:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",

  // 💡 AI 유추 및 커밋 분석 요약 (OpenAI API 결과 파이프라인 상상)
  aiOverview: {
    summary:
      "냉장고 속 잔여 재료 정보를 입력하면 OpenAI API 기반 Edge Function을 통해 맞춤형 레시피와 다이어트 칼로리 정보를 실시간으로 생성하는 웹 플랫폼입니다. Supabase Auth 및 RLS를 적용해 안전한 유저 커뮤니티와 레시피 북마크 생태계를 구축했습니다.",
    keyFeatures: [
      "OpenAI GPT-4o 기반 개인화 맞춤 레시피 자동 생성 및 이미지 렌더링",
      "Supabase PostgreSQL + Edge Functions 기반의 실시간 데이터 동기화",
      "Supabase Auth & Row Level Security(RLS)를 적용한 멀티 테넌트 데이터 보안",
      "사용자 작성 레시피 아카이빙, 좋아요 및 카테고리 필터링 탐색 시스템",
    ],
  },

  // 💡 트러블슈팅 & 개발 이력 (STAR 패턴)
  troubleshooting: [
    {
      id: "TS-01",
      title: "Supabase RLS 보안 정책과 Edge Function 호출 간 권한 위반 (42501)",
      issue:
        "OAuth 익명 세션 유저가 레시피를 생성할 때 Supabase RLS Policy 차단으로 인해 Insert 에러 발생",
      solution:
        "Service Role Key를 분리하고, client side mutation 대신 Supabase Edge Function 내부에서 JWT 파싱 후 RLS bypass를 적용하여 데이터 무결성 확보",
    },
    {
      id: "TS-02",
      title: "OpenAI API 스트리밍 응답 지연 시 UI 병목 현상",
      issue: "레시피 생성 완료까지 4~5초간 화면이 멈춰 UX 저하 발생",
      solution:
        "Server-Sent Events(SSE) 스트리밍 방식을 적용하고, React Suspense와 스케일링 스켈레톤 로더로 체감 대기 시간을 60% 감소시킴",
    },
  ],

  // 💡 커밋 로그 기반 주요 구현 이력
  commitHighlights: [
    {
      date: "2026.08.22",
      tag: "FEAT",
      msg: "Integrate OpenAI API edge function for custom recipe generation",
    },
    {
      date: "2026.08.18",
      tag: "SECURITY",
      msg: "Implement Supabase RLS policies on projects & recipes tables",
    },
    {
      date: "2026.08.15",
      tag: "AUTH",
      msg: "Setup GitHub OAuth & session lifecycle handler",
    },
  ],
};

export function DetailPage() {
  const project = MOCK_PROJECT_DETAIL;
  const [activeTab, setActiveTab] = useState<
    "overview" | "trouble" | "commits"
  >("overview");

  return (
    <>
      {/* 💡 공통 헤더 컴포넌트 호출 */}
      <Header />

      <article className="detail-container">
        {/* 1. 세부 페이지 전용 서브 액션 바 */}
        <div className="sub-action-bar">
          <Link href="/works" className="back-link">
            ← BACK TO INDEX
          </Link>

          <div className="action-group">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn demo-btn"
              >
                LIVE DEMO ↗
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn github-btn"
            >
              GITHUB REPO ↗
            </a>
          </div>
        </div>

        {/* 2. 히어로 헤더 섹션 */}
        <header className="detail-hero-header">
          <div className="hero-meta">
            <span className="ref-badge">SPECIMEN NO. #{project.id}</span>
            <span className="star-badge">
              ★ {project.stars} STARS / {project.forks} FORKS
            </span>
          </div>

          <h1 className="hero-title">{project.title}</h1>
          <p className="hero-subtitle">{project.subtitle}</p>

          <div className="stack-tags">
            {project.categoryTags.map((tag, idx) => (
              <span key={idx} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 3. 썸네일 & 퀵 메트릭스 격자 */}
        <section className="detail-visual-section">
          <div className="image-frame">
            <img src={project.heroImage} alt={project.title} />
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="label">LAST UPDATED</span>
              <span className="val">{project.updatedAt}</span>
            </div>
            <div className="metric-card">
              <span className="label">PRIMARY ENGINE</span>
              <span className="val">OpenAI / Supabase</span>
            </div>
            <div className="metric-card">
              <span className="label">VISIBILITY</span>
              <span className="val">{project.status}</span>
            </div>
            <div className="metric-card">
              <span className="label">ARCHIVE DATE</span>
              <span className="val">{project.createdAt}</span>
            </div>
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
              02 // TROUBLESHOOTING ({project.troubleshooting.length})
            </button>
            <button
              className={`tab-btn ${activeTab === "commits" ? "active" : ""}`}
              onClick={() => setActiveTab("commits")}
            >
              03 // COMMIT HISTORY
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="tab-content overview-panel">
              <div className="ai-summary-box">
                <div className="box-badge">AI INSIGHT SUMMARY</div>
                <p className="summary-text">{project.aiOverview.summary}</p>
              </div>

              <div className="features-list-box">
                <h3>KEY IMPLEMENTATION FEATURES</h3>
                <ul>
                  {project.aiOverview.keyFeatures.map((feat, idx) => (
                    <li key={idx}>
                      <span className="bullet">●</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "trouble" && (
            <div className="tab-content trouble-panel">
              {project.troubleshooting.map((item) => (
                <div className="trouble-card" key={item.id}>
                  <div className="trouble-header">
                    <span className="trouble-id">{item.id}</span>
                    <h4 className="trouble-title">{item.title}</h4>
                  </div>

                  <div className="trouble-body">
                    <div className="issue-box">
                      <strong>[PROBLEM / ISSUE]</strong>
                      <p>{item.issue}</p>
                    </div>
                    <div className="solution-box">
                      <strong>[RESOLUTION / TECH SOLUTION]</strong>
                      <p>{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "commits" && (
            <div className="tab-content commits-panel">
              <table className="commit-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>TYPE</th>
                    <th>COMMIT MESSAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {project.commitHighlights.map((c, idx) => (
                    <tr key={idx}>
                      <td className="date">{c.date}</td>
                      <td>
                        <span className="commit-tag">{c.tag}</span>
                      </td>
                      <td className="msg">{c.msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      {/* 💡 공통 푸터 컴포넌트 호출 */}
      <Footer />
    </>
  );
}
