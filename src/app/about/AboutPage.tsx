"use client";

import React from "react";
import "./AboutPage.scss";

interface CareerItem {
  period: string;
  organization: string;
  location: string;
  role: string;
  description: string;
  discipline: string;
}

interface TechCraftItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

const CAREER_HISTORY: CareerItem[] = [
  {
    period: "2024 — PRESENT",
    organization: "ESTSOFT ORMI FRONTEND",
    location: "SEOUL, KR",
    role: "Frontend Developer & Lead Trainee",
    description:
      "Architecting modern web applications using React, Next.js, and Supabase. Spearheading UI/UX implementations and state-driven components.",
    discipline: "ENGINEERING",
  },
  {
    period: "2023 — 2024",
    organization: "KROMATIK LABS",
    location: "SEOUL, KR",
    role: "Frontend Developer",
    description:
      "Developed high-performance web products, scalable component design systems, and responsive kinetic digital interfaces.",
    discipline: "DEVELOPMENT",
  },
  {
    period: "2022 — 2023",
    organization: "ATELIER STUDIO",
    location: "SEOUL, KR",
    role: "UI/UX Developer & Designer",
    description:
      "Created interactive prototype flows using Figma, connected backend services via Supabase, and managed deployment workflows on Vercel.",
    discipline: "DESIGN & UI",
  },
];

const TECH_CRAFTS: TechCraftItem[] = [
  {
    id: "/01 // CORE ARCHITECTURE",
    category: "FRAMEWORK & ENGINE",
    title: "REACT & NEXT.JS",
    description:
      "Strict TypeScript integration, SSR/SSG rendering patterns, App Router architectures, and optimized client state structures.",
    tags: ["TYPESCRIPT", "NEXT.JS", "REACT", "TURBOPACK"],
  },
  {
    id: "/02 // STYLING & KINETICS",
    category: "UI & DESIGN SYSTEM",
    title: "SCSS & TAILWIND",
    description:
      "Architectural SCSS modularity, Swiss typographic layout grids, responsive design systems, and microsecond render paths.",
    tags: ["SCSS", "TAILWIND", "CSS MODULES", "FIGMA"],
  },
  {
    id: "/03 // BACKEND & DATABASE",
    category: "BAAS & AUTH",
    title: "SUPABASE & DATABASE",
    description:
      "Relational PostgreSQL setup, Row Level Security (RLS), real-time subscriptions, and secure OAuth/Email Auth flows.",
    tags: ["SUPABASE", "POSTGRESQL", "RLS", "REST API"],
  },
  {
    id: "/04 // AI INTEGRATION",
    category: "INTELLIGENCE & APIS",
    title: "OPENAI & STREAMING",
    description:
      "Integrating LLM workflows, automated portfolio format synthesis, streaming UI responses, and prompt engineering.",
    tags: ["OPENAI API", "VERCEL AI SDK", "NODE.JS"],
  },
  {
    id: "/05 // DEPLOYMENT & CI/CD",
    category: "INFRASTRUCTURE",
    title: "VERCEL & GIT WORKFLOW",
    description:
      "Automated Git version control, GitHub Collaboration workflows, Vercel cloud hosting, and environment management.",
    tags: ["VERCEL", "GIT", "GITHUB", "CI/CD"],
  },
  {
    id: "/06 // TOOLING & DOCS",
    category: "WORKFLOW & COLLAB",
    title: "FIGMA & NOTION",
    description:
      "Precision wireframing in Figma, interactive UX prototypes, and comprehensive technical wiki management in Notion.",
    tags: ["FIGMA", "NOTION", "SLACK", "VS CODE"],
  },
];

export function AboutPage() {
  return (
    <div className="about-container">
      {/* Header */}
      <header className="header">
        <div className="header__left">
          <span className="logo">ARCH™</span>
          <span className="sub-tag">
            DOSSIER / CURRICULUM VITAE
            <br />
            SYS.REF 2026.09
          </span>
        </div>
        <nav className="header__nav">
          <a href="/" className="nav-link">
            INDEX
          </a>
          <a href="/works" className="nav-link">
            WORKS
          </a>
          <a href="/about" className="nav-link active">
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

      {/* Hero / Bio Section */}
      <section className="bio-section">
        <div className="bio-left">
          <div className="portrait-wrap">
            <span className="tag-overlay">FIG.01 PORTRAIT</span>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Portrait"
            />
          </div>
          <div className="status-box">
            <span className="label">CURRENT STATUS // ● ACTIVE DISPATCH</span>
            <h3>Open for select opportunities (Q3/Q4)</h3>
            <p>PERMISSION GRANTED — FRONTEND / LEAD ARCHITECT</p>
          </div>
        </div>

        <div className="bio-right">
          <h1 className="name-title">
            JU HU SAN —<br />
            FRONTEND ENGINEER &<br />
            CREATIVE ARCHITECT
          </h1>

          <div className="philosophy-box">
            <div className="philo-label">
              <span>PHILOSOPHY</span>
              <span>SWISS METHODOLOGY // BRUTALIST RIGOR</span>
            </div>
            <p className="philo-text">
              Operating at the fault line where computational rigor coincides
              with relentless editorial design. Over the past years, I have
              engineered digital flagships, high-velocity design systems, and
              robust web applications for forward-looking web projects.
            </p>
            <p className="philo-subtext">
              Every project is an opportunity to build from structural
              fundamentals: semantic clean architecture, precise typographic
              hierarchies, and performant render execution.
            </p>
          </div>

          <div className="metrics-bar">
            <div className="metric-col">
              <span className="label">EXPERIENCE</span>
              <span className="value">03+</span>
              <span className="sub">YEARS ACTIVE</span>
            </div>
            <div className="metric-col">
              <span className="label">PROJECTS</span>
              <span className="value">18</span>
              <span className="sub">SHIPPED & DEPLOYED</span>
            </div>
            <div className="metric-col">
              <span className="label">SHIPPED SITES</span>
              <span className="value">24</span>
              <span className="sub">ENTERPRISE REPOS</span>
            </div>
            <div className="metric-col">
              <span className="label">TIMEZONE</span>
              <span className="value">UTC+9</span>
              <span className="sub">SEOUL, KOREA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Trajectory Section */}
      <section className="career-section">
        <div className="section-header">
          <div>
            <span className="sub-label">DOSSIER // 01 — TIMELINE</span>
            <h2 className="section-title">CAREER TRAJECTORY</h2>
          </div>
          <p className="header-desc">
            A record of technical engineering, design execution, and enterprise
            application deployments.
          </p>
        </div>

        <div className="career-table">
          <div className="table-header">
            <span>TIMELINE</span>
            <span>ORGANIZATION & LOCATION</span>
            <span>ROLE & FOCUS</span>
            <span>DISCIPLINE</span>
          </div>
          {CAREER_HISTORY.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="col-period">{item.period}</div>
              <div className="col-org">
                <strong>{item.organization}</strong>
                <span>{item.location}</span>
              </div>
              <div className="col-role">
                <strong>{item.role}</strong>
                <p>{item.description}</p>
              </div>
              <div className="col-discipline">{item.discipline}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Craft Section */}
      <section className="craft-section">
        <div className="section-header">
          <div>
            <span className="sub-label">MATERIAL // 02 — STACK & METHOD</span>
            <h2 className="section-title">TECHNICAL CRAFT</h2>
          </div>
          <span className="right-label">
            DISCIPLINE STACK // CODE, ARCHITECTURE & UI
          </span>
        </div>

        <div className="craft-grid">
          {TECH_CRAFTS.map((craft, idx) => (
            <div className="craft-card" key={idx}>
              <div className="card-top">
                <span className="id">{craft.id}</span>
                <span className="icon">↗</span>
              </div>
              <h3>{craft.title}</h3>
              <p>{craft.description}</p>
              <div className="card-tags">
                {craft.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Initiate Collaboration */}
      <section className="contact-banner">
        <div className="banner-left">
          <span className="sub-tag">CONNECT DISPATCH // CHANNEL 01</span>
          <h2>
            INITIATE A<br />
            COLLABORATION.
          </h2>
          <p>
            Currently taking select engineering roles, architectural advisory,
            and high-impact web development initiatives for 2026.
          </p>
          <div className="btn-group">
            <button className="primary-btn">TRANSMIT INQUIRY ➔</button>
            <button className="secondary-btn">COPY EMAIL</button>
            <a href="#cv" className="link-btn">
              DOWNLOAD FULL CV (PDF) ↗
            </a>
          </div>
        </div>

        <div className="banner-right">
          <div className="contact-card">
            <span className="level">ENCRYPTED CREDENTIALS // SEC-LEVEL 0</span>
            <div className="email-block">
              <span className="label">PRIMARY EMAIL:</span>
              <a href="mailto:contact@juhusan.dev" className="email">
                juhusan@example.com
              </a>
            </div>
            <div className="social-links">
              <span>GITHUB</span> // <span>LINKEDIN</span> //{" "}
              <span>NOTION</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>ATELIER MONOCHROME / SWISS MODERN DESIGN SYSTEMS</div>
        <div>LAT 37.5665° N, LON 126.9780° E</div>
        <div>© 2026 ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}