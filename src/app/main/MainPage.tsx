"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useMainPage, useProjects } from "@/hooks";
import "./MainPage.scss";

const KINETIC_KEYWORDS = ["RESILIENT", "SCALABLE", "INTERACTIVE", "MODULAR"];

const CORE_SPECTRUMS = [
  { index: "01", label: "REACT & NEXT.JS", sub: "APP ROUTER / SSR" },
  { index: "02", label: "TYPESCRIPT", sub: "STRICT ARCHITECTURE" },
  { index: "03", label: "SUPABASE & RLS", sub: "SERVERLESS / EDGE" },
  { index: "04", label: "AI WORKFLOWS", sub: "OPENAI / AUTOMATION" },
  { index: "05", label: "SWISS UI SYSTEMS", sub: "DESIGN TOKENS / WCAG" },
];

export function MainPage() {
  const { featuredWorks, processSteps, faqs, openFaq, toggleFaq } =
    useMainPage();
  const { projects, isLoading: isProjectsLoading } = useProjects();

  // 1. 키네틱 롤링 헤드라인 인덱스
  const [keywordIdx, setKeywordIdx] = useState(0);

  // 2. 우측 Live Specimen 카드 슬라이드 인덱스
  const [specimenIdx, setSpecimenIdx] = useState(0);

  // 3. 마우스 스포트라이트 그리드 좌표
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIdx((prev) => (prev + 1) % KINETIC_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // PUBLISHED 상태인 실제 프로젝트 목록 (없을 경우 featuredWorks 폴백)
  const liveSpecimens = useMemo(() => {
    const published = (projects || []).filter((p) => p.status === "PUBLISHED");

    if (published.length > 0) {
      return published.map((proj) => {
        const rawCommits = proj.repository?.commit_history || [];
        const firstEntry = rawCommits[0] as any;
        const latestCommitMsg = firstEntry
          ? "commit" in firstEntry
            ? firstEntry.commit.message
            : firstEntry.message
          : "Initial specimen archived & verified.";

        return {
          id: proj.id,
          title: proj.title,
          imageUrl: proj.image_url,
          categories: proj.categories || [],
          latestCommit: latestCommitMsg,
          linkUrl: `/works/${proj.id}`,
        };
      });
    }

    return featuredWorks.map((w) => ({
      id: w.id,
      title: w.title,
      imageUrl: w.imageUrl,
      categories: [w.category],
      latestCommit: w.description,
      linkUrl: w.linkUrl,
    }));
  }, [projects, featuredWorks]);

  const activeSpecimen =
    liveSpecimens[specimenIdx % Math.max(liveSpecimens.length, 1)];

  const handlePrevSpecimen = () => {
    setSpecimenIdx((prev) =>
      prev === 0 ? liveSpecimens.length - 1 : prev - 1,
    );
  };

  const handleNextSpecimen = () => {
    setSpecimenIdx((prev) => (prev + 1) % liveSpecimens.length);
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="portfolio-main">
      {/* Hero Section: 7:5 Asymmetric Split Grid + Interactive Live Specimen */}
      <section
        className="hero hero--interactive"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
      >
        {/* 마우스 반응형 건축 그리드 오버레이 */}
        <div className="hero__grid-backdrop" aria-hidden="true" />

        {/* 상단 메타 바 */}
        <div className="hero__top-meta">
          <span className="role-title">
            SYS.INDEX // FRONTEND SYSTEMS ENGINEER — 주후산
          </span>
          <div className="meta-right">
            <span className="sys-badge">● SYS LIVE PROD VER 4.8</span>
            <span className="year-range">(2024 — 2026)</span>
          </div>
        </div>

        {/* 메인 7:5 스플릿 그리드 */}
        <div className="hero__split-grid">
          {/* 좌측 7 cols: 키네틱 에디토리얼 타이포그래피 */}
          <div className="hero__left-col">
            <h1 className="hero__title">
              <span>ARCHITECTING</span>
              <span className="kinetic-slot" aria-live="polite">
                <span key={keywordIdx} className="kinetic-word">
                  {KINETIC_KEYWORDS[keywordIdx]}
                </span>
              </span>
              <span>WEB INTERFACES.</span>
            </h1>

            <p className="hero__lead">
              사용자 경험의 디테일과 예측 가능한 데이터 아키텍처를 설계하는
              프론트엔드 엔지니어입니다. 실제 GitHub 커밋과 서버리스
              파이프라인이 살아 움직이는 작업 아카이브를 탐색해 보세요.
            </p>

            <div className="hero__cta-row">
              <a href="#works" className="btn-hero-solid">
                EXPLORE SELECTED WORKS ↓
              </a>
              <Link href="/contact" className="btn-hero-outline">
                ASK AI ASSISTANT ↗
              </Link>
            </div>
          </div>

          {/* 우측 5 cols: 실시간 LIVE SPECIMEN 프리뷰 카드 */}
          <div className="hero__right-col">
            <div className="specimen-card">
              <div className="specimen-card__header">
                <span className="specimen-status">
                  ● LIVE SPECIMEN //{" "}
                  {isProjectsLoading ? "SYNCING..." : "DB INDEXED"}
                </span>

                {liveSpecimens.length > 1 && (
                  <div className="specimen-nav">
                    <button
                      type="button"
                      onClick={handlePrevSpecimen}
                      aria-label="이전 프로젝트"
                    >
                      ←
                    </button>
                    <span className="specimen-counter">
                      {String(
                        (specimenIdx % liveSpecimens.length) + 1,
                      ).padStart(2, "0")}{" "}
                      / {String(liveSpecimens.length).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextSpecimen}
                      aria-label="다음 프로젝트"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>

              {activeSpecimen && (
                <>
                  <Link
                    href={activeSpecimen.linkUrl}
                    className="specimen-card__thumb"
                  >
                    <img
                      src={activeSpecimen.imageUrl}
                      alt={activeSpecimen.title}
                    />
                    <span className="thumb-overlay-badge">
                      OPEN CASE STUDY ↗
                    </span>
                  </Link>

                  <div className="specimen-card__body">
                    <div className="specimen-title-row">
                      <h3>{activeSpecimen.title}</h3>
                      <span className="specimen-id">#{activeSpecimen.id}</span>
                    </div>

                    <div className="specimen-tags">
                      {activeSpecimen.categories.slice(0, 3).map((tag, i) => (
                        <span key={i} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="specimen-commit-bar">
                      <span className="commit-label">LATEST COMMIT</span>
                      <p className="commit-text">
                        {activeSpecimen.latestCommit}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 하단 5열 핵심 기술 스펙트럼 바 */}
        <div className="hero__brand-ticker hero__spectrum-bar">
          {CORE_SPECTRUMS.map((item) => (
            <a href="#works" key={item.index} className="spectrum-cell">
              <span className="spectrum-idx">[{item.index}]</span>
              <strong className="spectrum-name">{item.label}</strong>
              <span className="spectrum-sub">{item.sub}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="works-section" id="works">
        <div className="section-header">
          <span>INDEXED WORKS / RECENT COMMISSIONS</span>
          <span>[01 — 03]</span>
        </div>

        <div className="works-list">
          {featuredWorks.map((work) => (
            <article className="work-card" key={work.id}>
              <div className="work-card__info">
                <span className="category">{work.category}</span>
                <h2 className="title">{work.title}</h2>
                <p className="description">{work.description}</p>
                <a href={work.linkUrl} className="explore-btn">
                  EXPLORE ARCHIVE ↗
                </a>
              </div>
              <div className="work-card__media">
                <img src={work.imageUrl} alt={work.title} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Client List Banner */}
      <section className="banner-names">
        <div className="banner-names__header">
          CLIENT ROSTER // ARCHIVAL INDEX
        </div>
        <h2 className="banner-names__list">
          HUNTER YEANY
          <br />
          VELOCE
          <br />
          WALKER
        </h2>
      </section>

      {/* Thoughtful Process */}
      <section className="process-section">
        <div className="section-header">
          <h2>
            THOUGHTFUL
            <br />
            PROCESS
          </h2>
          <span className="sub-label">[DISCIPLINE & EXECUTION]</span>
        </div>

        <div className="process-grid">
          {processSteps.map((step, idx) => (
            <div className="process-card" key={idx}>
              <div className="step-num">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="card-footer">
                <span>{step.phase}</span>
                <span className="icon">↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Humble Brag / Highlights Section */}
      <section className="brag-section">
        <div className="section-header">
          <h2>
            HUMBLE
            <br />
            BRAG
          </h2>
          <span className="sub-label">[RECOGNITION & AWARDS]</span>
        </div>

        <div className="award-blocks">
          <div className="block block--purple">
            <span className="tag">AWWWARDS</span>
            <h3>SOTD</h3>
            <span className="year">2026</span>
          </div>
          <div className="block block--mint">
            <span className="tag">FWA</span>
            <h3>OF THE DAY</h3>
            <span className="year">2X RECIPIENT</span>
          </div>
          <div className="block block--green">
            <span className="tag">RED DOT</span>
            <h3>BEST</h3>
            <span className="year">BRAND DESIGN</span>
          </div>
          <div className="block block--peach">
            <span className="tag">INDIGO</span>
            <h3>GOLD</h3>
            <span className="year">TYPOGRAPHY</span>
          </div>
          <div className="block block--lavender">
            <span className="tag">COMM ARTS</span>
            <h3>EXCELLENCE</h3>
            <span className="year">INTERACTIVE</span>
          </div>
          <div className="block block--black">
            <span className="tag">WEBBY</span>
            <h3>NOMINEE</h3>
            <span className="year">BEST VISUAL</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="label">METRIC / IMPACT</span>
            <div className="value">12+</div>
            <span className="desc">INTERNATIONAL HONORS</span>
          </div>
          <div className="metric-item">
            <span className="label">COMMISSIONS</span>
            <div className="value">48</div>
            <span className="desc">SHIPPED WORLDWIDE</span>
          </div>
          <div className="metric-item">
            <span className="label">ACTIVE RETENTION</span>
            <div className="value">94%</div>
            <span className="desc">REPEAT ENTERPRISE RATE</span>
          </div>
          <div className="metric-item">
            <span className="label">LATENCY BENCHMARK</span>
            <div className="value">60 FPS</div>
            <span className="desc">GPU RENDERING FLOOR</span>
          </div>
        </div>

        {/* Endorsement Quote */}
        <div className="quote-box">
          <div className="author-info">
            <div className="avatar-placeholder" />
            <div>
              <strong>MARCUS VANCE</strong>
              <span>VP CREATIVE, VELOCE LABS</span>
            </div>
          </div>
          <blockquote className="quote-text">
            "Ethan possesses that extraordinarily rare hybrid capability:
            uncompromising Swiss typographic discipline combined with native,
            fluid web engineering instincts. The digital experience he
            engineered redefined our market positioning instantly."
          </blockquote>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2>
            COMMON
            <br />
            QUESTIONS
          </h2>
          <span className="sub-label">[TERMS & WORKFLOW]</span>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              className={`faq-item ${openFaq === faq.id ? "open" : ""}`}
              key={faq.id}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="faq-question">
                <span>
                  0{faq.id} {faq.question}
                </span>
                <span className="toggle-icon">
                  {openFaq === faq.id ? "−" : "+"}
                </span>
              </div>
              {openFaq === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
