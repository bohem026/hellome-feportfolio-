"use client";

import React, { useState, useMemo } from "react";
import "./WorksPage.scss";

export interface WorkProject {
  id: string;
  archiveNum: string;
  year: string;
  categoryTag: string;
  categoryLabel: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

const ALL_WORKS: WorkProject[] = [
  {
    id: "1",
    archiveNum: "/01 — ARCHIVE",
    year: "2024",
    categoryTag: "BRAND SYSTEMS",
    categoryLabel: "BRAND SYSTEMS & ART DIRECTION",
    title: "HUNTER YEANY",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
  },
  {
    id: "2",
    archiveNum: "/02 — ARCHIVE",
    year: "2024",
    categoryTag: "CREATIVE ENGINEERING",
    categoryLabel: "CREATIVE ENGINEERING & WEBGL",
    title: "VELOCE OS",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
  },
  {
    id: "3",
    archiveNum: "/03 — ARCHIVE",
    year: "2023",
    categoryTag: "SPATIAL",
    categoryLabel: "SPATIAL & ENVIRONMENTAL",
    title: "WALKER PAVILION",
    imageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
  },
  {
    id: "4",
    archiveNum: "/04 — ARCHIVE",
    year: "2023",
    categoryTag: "MOTION",
    categoryLabel: "MOTION & KINETIC TYPE",
    title: "KINETIX LAB",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
  },
  {
    id: "5",
    archiveNum: "/05 — ARCHIVE",
    year: "2023",
    categoryTag: "BRAND SYSTEMS",
    categoryLabel: "BRAND SYSTEMS & IDENTITY",
    title: "NORDIC SOUND",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
  },
  {
    id: "6",
    archiveNum: "/06 — ARCHIVE",
    year: "2022",
    categoryTag: "CREATIVE ENGINEERING",
    categoryLabel: "CREATIVE ENGINEERING & UI",
    title: "STRATA COMPUTE",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    linkUrl: "#",
  },
];

const CATEGORIES = [
  "ALL",
  "BRAND SYSTEMS",
  "CREATIVE ENGINEERING",
  "MOTION",
  "SPATIAL",
];

export function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // 필터링 처리
  const filteredWorks = useMemo(() => {
    return ALL_WORKS.filter((work) => {
      const matchCategory =
        selectedCategory === "ALL" || work.categoryTag === selectedCategory;
      const matchSearch =
        work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.year.includes(searchTerm);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="works-container">
      {/* Header */}
      <header className="header">
        <div className="header__left">
          <span className="logo">ARCH™</span>
          <span className="sub-tag">
            ARCHIVE / EDITORIAL
            <br />
            SYS.REF 2026.09
          </span>
        </div>
        <nav className="header__nav">
          <a href="/" className="nav-link">
            INDEX
          </a>
          <a href="/works" className="nav-link active">
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

      {/* Main Title */}
      <section className="title-section">
        <div className="title-meta">
          <span>● CATALOGUE // 2021 — 2026</span>
        </div>
        <div className="title-wrap">
          <h1 className="main-title">
            INDEX OF WORKS{" "}
            <span className="count-badge">({ALL_WORKS.length})</span>
          </h1>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              :: GRID
            </button>
            <button
              className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              = TABLE
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Control Bar */}
      <section className="control-bar">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Filter by client, discipline, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "ALL" ? `ALL (${ALL_WORKS.length})` : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Works Display (Grid Mode) */}
      {viewMode === "grid" ? (
        <section className="works-grid">
          {filteredWorks.map((work) => (
            <article className="work-card" key={work.id}>
              <div className="card-top">
                <span className="archive-num">{work.archiveNum}</span>
                <span className="year">{work.year}</span>
              </div>
              <div className="card-image-wrap">
                <img src={work.imageUrl} alt={work.title} />
              </div>
              <div className="card-bottom">
                <div className="text-group">
                  <span className="category-label">{work.categoryLabel}</span>
                  <h3 className="project-title">{work.title}</h3>
                </div>
                <a href={work.linkUrl} className="arrow-link">
                  ↗
                </a>
              </div>
            </article>
          ))}
        </section>
      ) : (
        /* Works Display (Table Mode) */
        <section className="works-table">
          <table>
            <thead>
              <tr>
                <th>REF</th>
                <th>YEAR</th>
                <th>PROJECT</th>
                <th>DISCIPLINE</th>
                <th>LINK</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorks.map((work) => (
                <tr key={work.id}>
                  <td>{work.archiveNum}</td>
                  <td>{work.year}</td>
                  <td className="bold">{work.title}</td>
                  <td>{work.categoryLabel}</td>
                  <td>
                    <a href={work.linkUrl}>EXPLORE ↗</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Curatorial Breakdown Section */}
      <section className="breakdown-section">
        <div className="section-header">
          <div>
            <span className="sub-label">/06 — METRICS</span>
            <h2 className="section-title">CURATORIAL BREAKDOWN</h2>
          </div>
          <div className="metrics-summary">
            <div className="summary-item">
              <span className="label">TOTAL CLIENTS</span>
              <span className="value">28</span>
            </div>
            <div className="summary-item">
              <span className="label">GLOBAL REGIONS</span>
              <span className="value">06</span>
            </div>
            <div className="summary-item">
              <span className="label">RECOGNITIONS</span>
              <span className="value">19</span>
            </div>
          </div>
        </div>

        <div className="breakdown-grid">
          <div className="breakdown-card">
            <div className="card-header">
              <span>01 / BRAND</span>
              <span className="percent">45%</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-fill" style={{ width: "45%" }}></div>
            </div>
            <p className="desc">
              14 Major corporate & cultural identity packages executed.
            </p>
          </div>

          <div className="breakdown-card">
            <div className="card-header">
              <span>02 / ENGINEERING</span>
              <span className="percent">30%</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-fill" style={{ width: "30%" }}></div>
            </div>
            <p className="desc">
              WebGL engines, bespoke headless architectures, and design tokens.
            </p>
          </div>

          <div className="breakdown-card">
            <div className="card-header">
              <span>03 / MOTION</span>
              <span className="percent">15%</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-fill" style={{ width: "15%" }}></div>
            </div>
            <p className="desc">
              Realtime audio-reactive visualizers & dynamic typography.
            </p>
          </div>

          <div className="breakdown-card">
            <div className="card-header">
              <span>04 / SPATIAL</span>
              <span className="percent">10%</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-fill" style={{ width: "10%" }}></div>
            </div>
            <p className="desc">
              Physical spatial installations and architectural scenography.
            </p>
          </div>
        </div>
      </section>

      {/* Reserve CTA Banner */}
      <section className="reserve-banner">
        <div className="banner-left">
          <span className="sub-tag">TRANSACTION / COMMISSION</span>
          <h2>RESERVE A NEW SPECIMEN</h2>
          <p>
            Currently accepting project commissions for Q3/Q4. We review new
            commissions on a selective rolling basis.
          </p>
        </div>
        <div className="banner-right">
          <button className="cta-btn">SCHEDULE INTAKE →</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>ATELIER MONOCHROME / SWISS MODERN DESIGN SYSTEMS</div>
        <div>LAT 47.3769° N, LON 8.5417° E</div>
        <div>© 2026 ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}