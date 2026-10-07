"use client";

import React from "react";
import { useWorksPage } from "@/hooks";
import "./WorksPage.scss";

export function WorksPage() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    categories,
    filteredWorks,
    totalCount,
  } = useWorksPage();

  return (
    <div className="works-container">
      {/* Main Title */}
      <section className="title-section">
        <div className="title-meta">
          <span>● CATALOGUE // 2021 — 2026</span>
        </div>
        <div className="title-wrap">
          <h1 className="main-title">
            INDEX OF WORKS <span className="count-badge">({totalCount})</span>
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
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "ALL" ? `ALL (${totalCount})` : cat}
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
    </div>
  );
}