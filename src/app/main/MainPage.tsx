"use client";

import Link from "next/link";
import { useMainPage } from "@/hooks";
import { KINETIC_KEYWORDS, TECH_STACK_ITEMS } from "@/constants";
import "./MainPage.scss";

export function MainPage() {
  const {
    heroRef,
    closingRef,
    heroBgSlides,
    bgSlideIdx,
    currentBgItem,
    keywordIdx,
    isProjectsLoading,
    showcaseProjects,
    totalPublishedCount,
    currentTerminalCmd,
    typedText,
    terminalStepLabel,
    processSteps,
    engineeringFAQs,
    openFaq,
    handleHeroMouseMove,
    handleClosingMouseMove,
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
            {/* <span className="eyebrow">01 // VISUAL INDEX & ARCHITECTURE</span> */}
            <h2>Works & Tech Stacks.</h2>
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

      {/* Section 3: CMD Terminal Auto-Typing Area */}
      <section className="dossier-telemetry">
        <div className="cmd-terminal-card">
          {/* 터미널 상단 타이틀 바 */}
          <div className="cmd-terminal__head">
            <div className="head-left">
              <span className="status-dot" />
              <span>DOSSIER_STREAM.EXE</span>
            </div>
            <span className="step-counter">[{terminalStepLabel}]</span>
          </div>

          {/* 현재 실행 중인 커맨드 라인 */}
          <div className="cmd-terminal__prompt-bar">
            <span className="prompt-text">{currentTerminalCmd}</span>
          </div>

          {/* 타이핑 & 삭제 루프 스크린 (고정 높이로 레이아웃 흔들림 방지) */}
          <div className="cmd-terminal__screen">
            <textarea
              readOnly
              value={`${typedText}█`}
              aria-label="개발 이력 및 핵심 역량 요약 터미널"
            />
          </div>

          {/* /about 전체 프로필 유도 하단 게이트웨이 */}
          <Link href="/about" className="cmd-terminal__foot">
            <span>READ FULL BIO, TIMELINE &amp; RESUME</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Section 4: Engineering FAQ */}
      {/* FAQ Accordion Section */}
      <section className="faq-section" id="faq">
        <div className="faq-header">
          <div className="header-left">
            {/* <span className="eyebrow">03 // TECHNICAL INQUIRIES</span> */}
            <h2>FAQs.</h2>
          </div>

          <div className="header-right">
            <Link href="/contact" className="faq-header-cta">
              <span className="cta-label">ASK DIRECTLY VIA AI</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="faq-list">
          {engineeringFAQs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                key={faq.id}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="question-left">
                    <span className="faq-index">
                      {String(faq.id).padStart(2, "0")}
                    </span>
                    <span className="question-text">{faq.question}</span>
                  </div>
                  <span className="toggle-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 5: Closing Gateway Section */}
      <section
        className="closing-spotlight"
        ref={closingRef}
        onMouseMove={handleClosingMouseMove}
      >
        {/* 1. 마우스 추적 스포트라이트 오라 */}
        <div className="spotlight-aura" aria-hidden="true" />

        {/* 2. 배경 초대형 아웃라인 워터마크 (마우스 미세 패럴랙스) */}
        <div className="closing-watermark" aria-hidden="true">
          COLLABORATE
        </div>

        {/* 3. 건축 도면 스타일 코너 크로스헤어 */}
        <span className="corner-mark top-left" aria-hidden="true">
          +
        </span>
        <span className="corner-mark top-right" aria-hidden="true">
          +
        </span>
        <span className="corner-mark bottom-left" aria-hidden="true">
          +
        </span>
        <span className="corner-mark bottom-right" aria-hidden="true">
          +
        </span>

        {/* 4. 중앙 정렬 단일 포커스 콘텐츠 & 단일 CTA */}
        <div className="closing-spotlight__inner">
          {/* <span className="closing-eyebrow">
            04 // NEXT STEP — DIRECT TRANSMISSION
          </span> */}

          <h2 className="closing-headline">
            LET&apos;S ARCHITECT YOUR
            {/* <br /> */}
            NEXT PRODUCT.
          </h2>

          <p className="closing-subcopy">
            채용 제안부터 프로덕트 협업까지, AI 어시스턴트를 통해 가장 빠르게
            대화를 시작해 보세요.
          </p>

          <Link href="/contact" className="btn-spotlight-cta">
            <span>START CONVERSATION</span>
            <span className="cta-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
