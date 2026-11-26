"use client";

import Link from "next/link";
import { useMainPage } from "@/hooks";
import { KINETIC_KEYWORDS, TECH_STACK_ITEMS } from "@/constants";
import "./MainPage.scss";

export function MainPage() {
  const {
    heroRef,
    heroBgSlides,
    bgSlideIdx,
    // currentBgItem,
    keywordIdx,
    isProjectsLoading,
    // showcaseProjects,
    totalPublishedCount,
    // featuredWorks,
    processSteps,
    faqs,
    openFaq,
    handleHeroMouseMove,
    toggleFaq,
  } = useMainPage();

  return (
    <div className="portfolio-main">
      {/* Section 1: Hero Section */}
      {/* Dynamic Thumbnail + Typography */}
      <section
        className="hero hero--interactive"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
      >
        {/* 1. 배경 슬라이드쇼 레이어 */}
        <div className="hero__bg-slideshow" aria-hidden="true">
          {heroBgSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`bg-slide-item ${
                idx === bgSlideIdx % heroBgSlides.length ? "is-active" : ""
              }`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          ))}
          <div className="bg-slide-vignette" />
        </div>

        {/* 2. 마우스 반응형 오버레이 */}
        <div className="hero__grid-backdrop" aria-hidden="true" />

        {/* 3. 타이포그래피 & CTA */}
        <div className="hero__content-wrap">
          <h1 className="hero__title">
            <span>ARCHITECTING</span>
            <span className="kinetic-slot" aria-live="polite">
              <span key={keywordIdx} className="kinetic-word">
                {KINETIC_KEYWORDS[keywordIdx]}
              </span>
            </span>
            <span>WEB INTERFACES.</span>
          </h1>

          <div className="hero__bottom-row">
            <div className="hero__lead-block">
              <p className="hero__lead">
                사용자 경험의 디테일과 견고한 데이터 흐름을 설계하는 프론트엔드
                엔지니어입니다. 실제 코드와 커밋 이력으로 검증된 프로덕트
                아카이브를 확인해 보세요.
              </p>

              <div className="hero__cta-row">
                <a href="#works" className="btn-hero-solid">
                  EXPLORE SELECTED WORKS ↓
                </a>
                <Link href="/contact" className="btn-hero-outline">
                  CONTACT AI ASSISTANT ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Kinetic Archive Lookbook & */}
      {/* Tech Stack Marquee Section */}
      <section className="showcase-section" id="works">
        <div className="showcase-header">
          <div className="header-left">
            <span className="eyebrow">01 // VISUAL INDEX & ARCHITECTURE</span>
            <h2>ARCHIVAL LOOKBOOK.</h2>
          </div>

          {/* 추가: 하단 CTA-> 헤더 우측으로 재배치 */}
          <div className="header-right">
            <Link href="/works" className="works-header-cta">
              <span className="cta-label">EXPLORE FULL WORKS ARCHIVE</span>
              <span className="cta-count">
                [{String(totalPublishedCount).padStart(2, "0")}]
              </span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* 1. 프로젝트 썸네일 필름스트립 */}
        <div className="kinetic-filmstrip-wrapper">
          {isProjectsLoading ? (
            <div className="filmstrip-skeleton-row">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="film-frame-skeleton" />
              ))}
            </div>
          ) : (
            <div className="kinetic-filmstrip-track">
              {/* 무한 루프를 위해 2회 복제 렌더링 */}
              {[...heroBgSlides, ...heroBgSlides].map((slide, idx) => {
                const serialNum = (idx % heroBgSlides.length) + 1;
                return (
                  <div
                    key={`${slide.id}-${idx}`}
                    className="filmstrip-frame"
                    aria-hidden={idx >= heroBgSlides.length}
                  >
                    <div className="frame-meta">
                      <span>FIG. {String(serialNum).padStart(2, "0")}</span>
                      <span>35MM // ARCHIVE</span>
                    </div>
                    <div className="frame-image">
                      <img src={slide.imageUrl} alt="" loading="lazy" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. 핵심 기술 스택 리본 */}
        <div className="kinetic-stack-wrapper">
          <div className="kinetic-stack-track">
            {[...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS].map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="stack-marquee-chip"
                aria-hidden={idx >= TECH_STACK_ITEMS.length}
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/111111`}
                  alt={tech.name}
                  width={18}
                  height={18}
                  loading="lazy"
                />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
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
