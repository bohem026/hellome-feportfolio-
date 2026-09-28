"use client";

import React, { useState } from "react";
import "./page.scss";

// 포트폴리오 메인 워크 데이터 타입 정의
interface WorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

// 프로세스 데이터 타입 정의
interface ProcessItem {
  step: string;
  title: string;
  description: string;
  phase: string;
}

// FAQ 데이터 타입 정의
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FEATURED_WORKS: WorkItem[] = [
  {
    id: "01",
    category: "ARCH-01 / FRONTEND ARCHITECTURE",
    title: "HUNTER YEANY RACING",
    description:
      "Comprehensive telemetry dashboard and real-time kinetic digital identity for Formula motorsport driver.",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    linkUrl: "#",
  },
  {
    id: "02",
    category: "CASE 02 / IDENTITY & E-COMMERCE",
    title: "VELOCE ATELIER",
    description:
      "Art direction and spatial digital storefront for contemporary industrial ceramic studio based in Zurich.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    linkUrl: "#",
  },
  {
    id: "03",
    category: "TYPE 003 / DIGITAL SYSTEM",
    title: "WALKER SOUND LAB",
    description:
      "Generative waveform acoustic interface and bespoke variable typography engine for spatial audio brand.",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    linkUrl: "#",
  },
];

const PROCESS_STEPS: ProcessItem[] = [
  {
    step: "/ 01",
    title: "DISCOVERY",
    description:
      "Deconstructing foundational business intent, ecosystem benchmarks, and user behavioral archetypes before lines are drawn.",
    phase: "PHASE_01",
  },
  {
    step: "/ 02",
    title: "RESEARCH",
    description:
      "Synthesizing visual culture, architectural typography, and technical stack ergonomics into a comprehensive briefing index.",
    phase: "PHASE_02",
  },
  {
    step: "/ 03",
    title: "DESIGN",
    description:
      "Radical spatial composition, microscopic grid systems, motion prototypes, and deliberate visual tension.",
    phase: "PHASE_03",
  },
  {
    step: "/ 04",
    title: "DEVELOPMENT",
    description:
      "Pixel-exact translation utilizing Next.js, semantic clean architectures, responsive kinetics, and microsecond render paths.",
    phase: "PHASE_04",
  },
  {
    step: "/ 05",
    title: "VALIDATION",
    description:
      "Stress-testing viewport breakpoints, accessibility vectors, typography responsiveness, and performance profiling.",
    phase: "PHASE_05",
  },
  {
    step: "/ 06",
    title: "EVOLVE",
    description:
      "Ongoing creative guardianship, brand evolution tooling, design system scalability, and ongoing optimization cycles.",
    phase: "PHASE_06",
  },
];

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "WHAT IS YOUR CURRENT COMMENCEMENT LEAD TIME?",
    answer:
      "Projects typically commence within 2-4 weeks depending on the existing scope and design system requirements.",
  },
  {
    id: 2,
    question: "DO YOU PROVIDE FULL TECHNICAL STACK IMPLEMENTATION?",
    answer:
      "Yes, full-stack implementation using React, Next.js, TypeScript, and Supabase is provided natively.",
  },
  {
    id: 3,
    question: "HOW DO YOU STRUCTURE PROJECT ENGAGEMENTS?",
    answer:
      "Engagements are structured into discovery, architecture, iterative design sprints, and full-scale deployment.",
  },
  {
    id: 4,
    question: "CAN YOU COLLABORATE WITH INTERNAL ENGINEERING TEAMS?",
    answer:
      "Seamless embedment within product and engineering teams via Slack, GitHub, and Figma workflows is standard.",
  },
];

export default function page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="portfolio-main">
      {/* Top Header */}
      <header className="header">
        <div className="header__left">
          <span className="logo">ARCH™ 2026</span>
          <span className="sub-tag">
            ARCHIVE / EDITORIAL
            <br />
            SYSTEM V2026.09
          </span>
        </div>
        <nav className="header__nav">
          <a href="#index" className="nav-link active">
            INDEX
          </a>
          <a href="#works" className="nav-link">
            WORKS
          </a>
          <a href="#about" className="nav-link">
            ABOUT
          </a>
          <a href="#contact" className="nav-link">
            CONTACT ASSISTANT
          </a>
          <a href="#sys" className="nav-link">
            SYS CONSOLE
          </a>
        </nav>
        <div className="header__right">
          <span className="status-badge">● AVAILABLE FOR Q3/Q4</span>
          <div className="user-profile">
            <span className="avatar">JH</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__top-meta">
          <span className="role-title">
            FRONTEND ENGINEER & CREATIVE ARCHITECT
          </span>
          <span className="year-range">(2022 — 2026)</span>
        </div>
        <h1 className="hero__title">
          STUNNING
          <br />
          BRANDS
          <br />
          & DIGITAL
          <br />
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
            — Ethan Suero is an independent designer and creative engineer
            focused on crafting immersive digital experiences. He believes every
            project is an uncompromising opportunity to deliver a singular,
            indelible digital narrative that delights users and scales brand
            equity.
          </p>
          <a href="#dossier" className="link-arrow">
            READ FULL DOSSIER →
          </a>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="works-section" id="works">
        <div className="section-header">
          <span>INDEXED WORKS / RECENT COMMISSIONS</span>
          <span>[01 — 03]</span>
        </div>

        <div className="works-list">
          {FEATURED_WORKS.map((work) => (
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

      {/* Client List Ticker Banner */}
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
          {PROCESS_STEPS.map((step, idx) => (
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
          {FAQS.map((faq) => (
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

      {/* Footer */}
      <footer className="footer">
        <div>ATELIER MORPHOLOGY / SWISS MODERN DESIGN SYSTEMS</div>
        <div>LAT 47.3769° N, LON 8.5417° E</div>
        <div>© 2026 ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}
