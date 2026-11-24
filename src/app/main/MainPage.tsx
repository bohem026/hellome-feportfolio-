"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useMainPage, useProjects } from "@/hooks";
import "./MainPage.scss";

const KINETIC_KEYWORDS = ["RESILIENT", "SCALABLE", "INTERACTIVE", "MODULAR"];

export function MainPage() {
  const { featuredWorks, processSteps, faqs, openFaq, toggleFaq } =
    useMainPage();
  const { projects } = useProjects();

  // 1. 키네틱 롤링 헤드라인 인덱스
  const [keywordIdx, setKeywordIdx] = useState(0);

  // 2. 배경 썸네일 슬라이드 인덱스
  const [bgSlideIdx, setBgSlideIdx] = useState(0);

  // 3. 마우스 스포트라이트 그리드 좌표
  const heroRef = useRef<HTMLElement | null>(null);

  // PUBLISHED 프로젝트 썸네일 목록 추출 (폴백: featuredWorks)
  const heroBgSlides = useMemo(() => {
    const published = (projects || []).filter(
      (p) => p.status === "PUBLISHED" && p.image_url,
    );

    if (published.length > 0) {
      return published.map((p) => ({
        id: p.id,
        title: p.title,
        imageUrl: p.image_url,
      }));
    }

    return featuredWorks.map((w) => ({
      id: w.id,
      title: w.title,
      imageUrl: w.imageUrl,
    }));
  }, [projects, featuredWorks]);

  // 키워드 롤링 타이머 (2.8초)
  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIdx((prev) => (prev + 1) % KINETIC_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 배경 썸네일 크로스페이드 슬라이드 타이머 (4.5초)
  useEffect(() => {
    if (heroBgSlides.length <= 1) return;
    const slideInterval = setInterval(() => {
      setBgSlideIdx((prev) => (prev + 1) % heroBgSlides.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [heroBgSlides.length]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const currentBgItem =
    heroBgSlides[bgSlideIdx % Math.max(heroBgSlides.length, 1)];

  return (
    <div className="portfolio-main">
      {/* Hero Section: Full-Bleed Ambient Thumbnail + Kinetic Typography */}
      <section
        className="hero hero--interactive"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
      >
        {/* 1. 게시된 프로젝트 썸네일 배경 슬라이드쇼 레이어 */}
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

        {/* 2. 마우스 반응형 건축 그리드 오버레이 */}
        <div className="hero__grid-backdrop" aria-hidden="true" />

        {/* 3. 메인 에디토리얼 타이포그래피 & CTA */}
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

            {/* 우측 하단: 현재 배경 썸네일 인덱스 인디케이터 */}
            {currentBgItem && (
              <div className="hero__bg-caption">
                <span className="caption-label">
                  AMBIENT ARCHIVE //{" "}
                  {String((bgSlideIdx % heroBgSlides.length) + 1).padStart(
                    2,
                    "0",
                  )}{" "}
                  / {String(heroBgSlides.length).padStart(2, "0")}
                </span>
                <span className="caption-title">{currentBgItem.title}</span>
              </div>
            )}
          </div>
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
