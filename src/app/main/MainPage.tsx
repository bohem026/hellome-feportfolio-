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
    totalCommitCount,
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

      {/* Section 03: Engineering Philosophy & */}
      {/* Dossier (/about) */}
      <section className="dossier-section" id="dossier">
        <div className="dossier-header">
          <div className="header-left">
            <span className="eyebrow">
              02 // ENGINEERING DOSSIER & PHILOSOPHY
            </span>
            <h2>SYSTEMS OVER SURFACE.</h2>
          </div>

          <div className="header-right">
            <Link href="/about" className="dossier-header-cta">
              <span className="cta-label">READ FULL DOSSIER & RESUME</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="dossier-grid">
          {/* 좌측 7 cols: 엔지니어링 선언문 & 3대 설계 원칙 */}
          <div className="dossier-manifesto">
            <blockquote className="manifesto-quote">
              “견고한 프론트엔드 아키텍처는 화려한 시각 효과 이전에 예측 가능한
              데이터 흐름과 타협 없는 디테일에서 완성됩니다.”
            </blockquote>

            <div className="principles-list">
              <div className="principle-row">
                <span className="principle-num">01</span>
                <div className="principle-body">
                  <h3>PREDICTABLE STATE & DATA FLOW</h3>
                  <p>
                    단방향 데이터 흐름과 엄격한 타입 시스템(TypeScript)을
                    기반으로 복잡한 비동기 상태와 서버리스 동기화 로직을
                    안전하게 격리합니다.
                  </p>
                </div>
              </div>

              <div className="principle-row">
                <span className="principle-num">02</span>
                <div className="principle-body">
                  <h3>TOKENIZED DESIGN SYSTEMS & ACCESSIBILITY</h3>
                  <p>
                    1px 그리드 규율과 모듈형 스타일 토큰을 통해 일관된 UI
                    확장성을 확보하고, 시맨틱 마크업과 웹 접근성(WCAG) 기준을
                    준수합니다.
                  </p>
                </div>
              </div>

              <div className="principle-row">
                <span className="principle-num">03</span>
                <div className="principle-body">
                  <h3>AI-AUGMENTED SERVERLESS PIPELINES</h3>
                  <p>
                    PostgreSQL·Edge Functions·LLM API를 유기적으로 결합해
                    반복적인 콘텐츠 요약, 데이터 동기화, 사용자 응대
                    워크플로우를 자동화합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 우측 5 cols: 아키텍처 라인 다이어그램 & 실시간 DB 지표 */}
          <aside className="dossier-telemetry">
            <div className="telemetry-card">
              <div className="telemetry-card__head">
                <span>ARCHITECTURE TOPOLOGY</span>
                <span>● LIVE METRICS</span>
              </div>

              {/* 1px 모노크롬 시스템 아키텍처 도식 */}
              <div className="topology-diagram" aria-hidden="true">
                <svg viewBox="0 0 360 150" fill="none">
                  {/* 연결선 */}
                  <line
                    x1="95"
                    y1="75"
                    x2="145"
                    y2="75"
                    stroke="#111111"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="215"
                    y1="75"
                    x2="265"
                    y2="75"
                    stroke="#111111"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* Node 1: Client */}
                  <rect
                    x="15"
                    y="45"
                    width="80"
                    height="60"
                    fill="#ffffff"
                    stroke="#111111"
                    strokeWidth="1"
                  />
                  <text
                    x="55"
                    y="72"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="800"
                    fill="#111111"
                    fontFamily="monospace"
                  >
                    NEXT.JS
                  </text>
                  <text
                    x="55"
                    y="85"
                    textAnchor="middle"
                    fontSize="6.5"
                    fill="#666666"
                    fontFamily="monospace"
                  >
                    CLIENT UI
                  </text>

                  {/* Node 2: Edge / AI */}
                  <rect
                    x="145"
                    y="45"
                    width="70"
                    height="60"
                    fill="#111111"
                    stroke="#111111"
                    strokeWidth="1"
                  />
                  <text
                    x="180"
                    y="72"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="800"
                    fill="#ffffff"
                    fontFamily="monospace"
                  >
                    EDGE / AI
                  </text>
                  <text
                    x="180"
                    y="85"
                    textAnchor="middle"
                    fontSize="6.5"
                    fill="#bbbbbb"
                    fontFamily="monospace"
                  >
                    FUNCTIONS
                  </text>

                  {/* Node 3: DB */}
                  <rect
                    x="265"
                    y="45"
                    width="80"
                    height="60"
                    fill="#ffffff"
                    stroke="#111111"
                    strokeWidth="1"
                  />
                  <text
                    x="305"
                    y="72"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="800"
                    fill="#111111"
                    fontFamily="monospace"
                  >
                    SUPABASE
                  </text>
                  <text
                    x="305"
                    y="85"
                    textAnchor="middle"
                    fontSize="6.5"
                    fill="#666666"
                    fontFamily="monospace"
                  >
                    POSTGRES DB
                  </text>
                </svg>
              </div>

              {/* 실시간 DB 집계 지표 4칸 그리드 */}
              <div className="telemetry-metrics">
                <div className="metric-cell">
                  <span className="m-label">PUBLISHED SYSTEMS</span>
                  <strong className="m-val">
                    {String(totalPublishedCount).padStart(2, "0")}
                  </strong>
                </div>
                <div className="metric-cell">
                  <span className="m-label">INDEXED COMMITS</span>
                  <strong className="m-val">
                    {totalCommitCount > 0 ? `${totalCommitCount}+` : "120+"}
                  </strong>
                </div>
                <div className="metric-cell">
                  <span className="m-label">CORE STACKS</span>
                  <strong className="m-val">16+</strong>
                </div>
                <div className="metric-cell">
                  <span className="m-label">BASE LOCATION</span>
                  <strong className="m-val">SEOUL, KR</strong>
                </div>
              </div>

              <Link href="/about" className="telemetry-card__foot">
                <span>INSPECT EXPERIENCE, SKILLS & BIO</span>
                <span>↗</span>
              </Link>
            </div>
          </aside>
        </div>
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
