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
    currentBgItem,
    keywordIdx,
    isProjectsLoading,
    showcaseProjects,
    totalPublishedCount,
    featuredWorks,
    processSteps,
    faqs,
    openFaq,
    handleHeroMouseMove,
    toggleFaq,
  } = useMainPage();

  return (
    <div className="portfolio-main">
      {/* Hero Section */}
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

      {/* Kinetic Archive Lookbook & */}
      {/* Tech Stack Marquee Section */}
      <section className="showcase-section" id="works">
        <div className="showcase-header">
          <div className="header-left">
            <span className="eyebrow">01 // VISUAL INDEX & ARCHITECTURE</span>
            <h2>ARCHIVAL LOOKBOOK.</h2>
          </div>
          <div className="header-right">
            <p className="header-desc">
              프론트엔드 아키텍처부터 서버리스·AI 워크플로우까지,
              <br />
              실제 배포된 프로덕트들의 시각적 단면과 기술 스펙트럼입니다.
            </p>
            <span className="index-counter">
              [LIVE INDEX // {String(totalPublishedCount).padStart(2, "0")}{" "}
              SPECIMENS]
            </span>
          </div>
        </div>

        {/* 1. 자동 연동 프로젝트 썸네일 키네틱 필름스트립 (좌측 흐름) */}
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

        {/* 2. 공식 아이콘 기반 핵심 기술 스택 마키 (우측 역방향 흐름) */}
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

        {/* 3. /works 전체 아카이브 유도 풀-와이드 게이트웨이 배너 */}
        <Link href="/works" className="works-gateway-banner">
          <div className="gateway-left">
            <span className="gateway-eyebrow">
              INSPECT SOURCE CODE, TROUBLESHOOTING & COMMITS
            </span>
            <strong className="gateway-title">
              EXPLORE FULL WORKS ARCHIVE
            </strong>
          </div>
          <div className="gateway-right">
            <span className="gateway-count">
              [{String(totalPublishedCount).padStart(2, "0")} SPECIMENS]
            </span>
            <span className="gateway-arrow">→</span>
          </div>
        </Link>
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
