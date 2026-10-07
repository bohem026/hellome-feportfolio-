'use client';

import React from 'react';
import { useMainPage } from '@/hooks';
import './MainPage.scss';

export function MainPage() {
  const { featuredWorks, processSteps, faqs, openFaq, toggleFaq } = useMainPage();

  return (
    <div className="portfolio-main">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__top-meta">
          <span className="role-title">FRONTEND ENGINEER & CREATIVE ARCHITECT</span>
          <span className="year-range">(2022 — 2026)</span>
        </div>
        <h1 className="hero__title">
          STUNNING<br />
          BRANDS<br />
          & DIGITAL<br />
          EXPERIENCES
        </h1>
        <div className="hero__badge-bar">
          <span className="sys-badge">● SYS LIVE PROD VER 4.8</span>
        </div>

        <div className="hero__brand-ticker">
          <span>HUNTER</span>
          <span>VELOCE LABS</span>
          <span className="bold-serif">WALKER&CO</span>
          <span>STUDIO SYS</span>
          <span>KINETIC</span>
        </div>

        <div className="hero__intro">
          <p className="intro-text">
            — Ethan Suero is an independent designer and creative engineer focused on crafting immersive digital experiences. He believes every project is an uncompromising opportunity to deliver a singular, indelible digital narrative that delights users and scales brand equity.
          </p>
          <a href="#dossier" className="link-arrow">READ FULL DOSSIER →</a>
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
                <a href={work.linkUrl} className="explore-btn">EXPLORE ARCHIVE ↗</a>
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
        <div className="banner-names__header">CLIENT ROSTER // ARCHIVAL INDEX</div>
        <h2 className="banner-names__list">
          HUNTER YEANY<br />
          VELOCE<br />
          WALKER
        </h2>
      </section>

      {/* Thoughtful Process */}
      <section className="process-section">
        <div className="section-header">
          <h2>THOUGHTFUL<br />PROCESS</h2>
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
          <h2>HUMBLE<br />BRAG</h2>
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
            "Ethan possesses that extraordinarily rare hybrid capability: uncompromising Swiss typographic discipline combined with native, fluid web engineering instincts. The digital experience he engineered redefined our market positioning instantly."
          </blockquote>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2>COMMON<br />QUESTIONS</h2>
          <span className="sub-label">[TERMS & WORKFLOW]</span>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              className={`faq-item ${openFaq === faq.id ? 'open' : ''}`}
              key={faq.id}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="faq-question">
                <span>0{faq.id} {faq.question}</span>
                <span className="toggle-icon">{openFaq === faq.id ? '−' : '+'}</span>
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