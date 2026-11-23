"use client";

import React, { useState, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useDetailPage, useGithubRepo } from "@/hooks";
import { CommitCategory, ClassifiedCommit, GithubCommit } from "@/types";
import "./DetailPage.scss";

interface DetailPageProps {
  id: string;
}

const COMMIT_FILTER_TABS: { key: CommitCategory; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "FEAT", label: "FEAT" },
  { key: "FIX", label: "FIX / ISSUE" },
  { key: "REFACTOR", label: "REFACTOR / OPT" },
  { key: "SECURITY", label: "AUTH / GRANT" },
  { key: "OTHER", label: "DOCS / ETC" },
];

export function DetailPage({ id }: DetailPageProps) {
  const { project, isLoading, error } = useDetailPage(id);
  const { classifyCommitWithKeywords } = useGithubRepo();

  const [activeTab, setActiveTab] = useState<
    "overview" | "trouble" | "commits"
  >("overview");

  // 커밋 필터링 & 점진적 스크롤 상태
  const [selectedCommitCategory, setSelectedCommitCategory] =
    useState<CommitCategory>("ALL");
  const [hideMergeLogs, setHideMergeLogs] = useState<boolean>(true);
  const [visibleCommitCount, setVisibleCommitCount] = useState<number>(20);
  const commitScrollBoxRef = useRef<HTMLDivElement | null>(null);

  // 레포지토리 하위 데이터 파싱
  const repo = project?.repository;
  const starsCount = repo?.stars ?? 0;
  const githubRepoUrl = repo?.repo_url || "";
  const formattedPushedDate = repo?.pushed_at
    ? new Date(repo.pushed_at).toISOString().split("T")[0]
    : "-";
  const rawCommitHistory = repo?.commit_history || [];

  /**
   * ClassifiedCommit[]과 GithubCommit[] 모두 ClassifiedCommit[]으로 정규화
   */
  const normalizedCommits: ClassifiedCommit[] = useMemo(() => {
    if (!Array.isArray(rawCommitHistory)) return [];

    return rawCommitHistory.map((item: ClassifiedCommit | GithubCommit) => {
      if ("commit" in item && item.commit) {
        return item;
      }
      return classifyCommitWithKeywords(item as GithubCommit);
    });
  }, [rawCommitHistory, classifyCommitWithKeywords]);

  /**
   * 카테고리별 커밋 수 집계
   */
  const commitCategoryCounts = useMemo(() => {
    const baseList = hideMergeLogs
      ? normalizedCommits.filter((item) => item.category !== "MERGE")
      : normalizedCommits;

    return {
      ALL: baseList.length,
      FEAT: baseList.filter((item) => item.category === "FEAT").length,
      FIX: baseList.filter((item) => item.category === "FIX").length,
      REFACTOR: baseList.filter((item) => item.category === "REFACTOR").length,
      SECURITY: baseList.filter((item) => item.category === "SECURITY").length,
      OTHER: baseList.filter((item) => item.category === "OTHER").length,
      MERGE: normalizedCommits.filter((item) => item.category === "MERGE")
        .length,
    };
  }, [normalizedCommits, hideMergeLogs]);

  /**
   * 카테고리 필터링
   * - 1. 미선택 카테고리 or MERGE 카테고리-> false
   * - 2. ALL 미체크 and 선택된 카테고리가 아님-> false
   * - 3. 그 외-> true
   */
  const filteredCommits = useMemo(() => {
    return normalizedCommits.filter((item) => {
      if (hideMergeLogs && item.category === "MERGE") return false;
      if (
        selectedCommitCategory !== "ALL" &&
        item.category !== selectedCommitCategory
      ) {
        return false;
      }
      return true;
    });
  }, [normalizedCommits, selectedCommitCategory, hideMergeLogs]);

  // 현재 뷰포트에 렌더링할 커밋 그룹
  const displayedCommits = filteredCommits.slice(0, visibleCommitCount);
  const hasMoreCommits = visibleCommitCount < filteredCommits.length;

  /**
   * 스크롤에 따른 카테고리 탭 전환 핸들러
   * @param category
   */
  const handleSelectCommitCategory = (category: CommitCategory) => {
    setSelectedCommitCategory(category);
    setVisibleCommitCount(20);
    commitScrollBoxRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * 내부 스크롤 하단 근접 시 점진적 추가 로드
   * 20건 단위
   * @returns
   */
  const handleCommitListScroll = () => {
    const box = commitScrollBoxRef.current;
    if (!box || !hasMoreCommits) return;

    if (box.scrollHeight - box.scrollTop - box.clientHeight < 80) {
      setVisibleCommitCount((prev) => prev + 20);
    }
  };

  // 로딩 상태 UI
  if (isLoading) {
    return (
      <div className="detail-container">
        <div className="detail-loading">
          <p>LOADING PROJECT SPECIMEN #{id}...</p>
        </div>
      </div>
    );
  }

  // 에러 또는 데이터 없음 UI
  if (error || !project) {
    return (
      <div className="detail-container">
        <div className="sub-action-bar">
          <Link href="/works" className="back-link">
            ← BACK TO INDEX
          </Link>
        </div>
        <div className="detail-error">
          <h2>SPECIMEN NOT FOUND</h2>
          <p>{error || "요청하신 프로젝트 정보를 찾을 수 없습니다."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <article className="detail-container">
        {/* 서브 액션 바 */}
        <div className="sub-action-bar">
          <Link href="/works" className="back-link">
            ← BACK TO INDEX
          </Link>

          <div className="action-group">
            {githubRepoUrl && (
              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn github-btn"
              >
                GITHUB REPO ↗
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn demo-btn"
              >
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>

        {/* 히어로 헤더 섹션 */}
        <header className="detail-hero-header">
          <div className="hero-meta">
            <span className="ref-badge">SPECIMEN NO. #{project.id}</span>
            <span className="star-badge">★ {starsCount} STARS</span>
          </div>

          <h1 className="hero-title">{project.title}</h1>

          <div className="stack-tags">
            {project.categories.map((tag, idx) => (
              <span key={idx} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 썸네일 & 메트릭스 */}
        <section className="detail-visual-section">
          <div className="image-frame">
            <img src={project.image_url} alt={project.title} />
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="label">LAST PUSHED</span>
              <span className="val">{formattedPushedDate}</span>
            </div>
            <div className="metric-card">
              <span className="label">ARCHIVE STATUS</span>
              <span className="val">{project.status}</span>
            </div>
            <div className="metric-card">
              <span className="label">GITHUB ID</span>
              <span className="val">#{project.github_id || project.id}</span>
            </div>
          </div>
        </section>

        {/* 탭 네비게이션 */}
        <section className="detail-tab-section">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              01 // OVERVIEW & FEATURES
            </button>
            <button
              className={`tab-btn ${activeTab === "trouble" ? "active" : ""}`}
              onClick={() => setActiveTab("trouble")}
            >
              02 // TROUBLESHOOTING
            </button>
            <button
              className={`tab-btn ${activeTab === "commits" ? "active" : ""}`}
              onClick={() => setActiveTab("commits")}
            >
              03 // COMMIT HISTORY ({normalizedCommits.length})
            </button>
          </div>

          {/* 탭 1: 개요 */}
          {activeTab === "overview" && (
            <div className="tab-content overview-panel">
              <div className="ai-summary-box">
                <div className="box-badge">PROJECT DESCRIPTION</div>

                <div className="summary-text markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img: ({ node, ...props }) => (
                        <img
                          {...props}
                          loading="lazy"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            display: "block",
                            margin: "1rem 0",
                          }}
                          alt={props.alt || "Project Image"}
                        />
                      ),
                    }}
                  >
                    {project.description || "No description registered."}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="features-list-box">
                <h3>REPOSITORY METADATA</h3>
                <ul>
                  <li>
                    <span className="bullet">●</span>
                    <span>
                      GitHub Repository: {githubRepoUrl || "DISCONNECTED"}
                    </span>
                  </li>
                  {repo?.languages && (
                    <li>
                      <span className="bullet">●</span>
                      <span>Tech Stack: {repo.languages.join(", ")}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* 탭 2: AI 트러블슈팅 */}
          {activeTab === "trouble" && (
            <div className="tab-content trouble-panel">
              {(() => {
                let aiSummary = project.ai_summary;

                if (typeof aiSummary === "string") {
                  try {
                    aiSummary = JSON.parse(aiSummary);
                  } catch (e) {
                    console.error("ai_summary parse error:", e);
                  }
                }

                const hasData =
                  aiSummary && typeof aiSummary === "object"
                    ? (aiSummary.hasData ?? false)
                    : false;

                if (!aiSummary || !hasData) {
                  return (
                    <div className="ai-summary-box">
                      <div className="box-badge">SYSTEM NOTICE</div>
                      <p className="summary-text">
                        {aiSummary?.message ||
                          "이 프로젝트는 등록된 트러블슈팅 커밋 이력이 없어 AI 분석서가 생성되지 않았습니다."}
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="trouble-card">
                    <div className="trouble-header">
                      <span className="trouble-id">FACT-BASED AI ANALYSIS</span>
                      <h4 className="trouble-title">
                        {aiSummary.issue_title ||
                          "TECHNICAL TROUBLESHOOTING REPORT"}
                      </h4>
                    </div>

                    <div className="trouble-body">
                      {aiSummary.challenges &&
                        aiSummary.challenges.length > 0 && (
                          <div className="trouble-section">
                            <h5>[TECHNICAL CHALLENGES]</h5>
                            <ul>
                              {aiSummary.challenges.map(
                                (item: string, idx: number) => (
                                  <li key={idx}>
                                    <span className="bullet">●</span>
                                    <span>{item}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                      {aiSummary.solutions &&
                        aiSummary.solutions.length > 0 && (
                          <div className="trouble-section">
                            <h5>[SOLUTIONS & ARCHITECTURE]</h5>
                            <ul>
                              {aiSummary.solutions.map(
                                (item: string, idx: number) => (
                                  <li key={idx}>
                                    <span className="bullet">●</span>
                                    <span>{item}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                      {aiSummary.key_learnings &&
                        aiSummary.key_learnings.length > 0 && (
                          <div className="trouble-section">
                            <h5>[KEY TAKEAWAYS & EARNED COMPETENCY]</h5>
                            <ul>
                              {aiSummary.key_learnings.map(
                                (item: string, idx: number) => (
                                  <li key={idx}>
                                    <span className="bullet">●</span>
                                    <span>{item}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 탭 3: 커밋 이력 */}
          {/* 추가: 카테고리 필터 + 고정 높이 점진 스크롤 */}
          {activeTab === "commits" && (
            <div className="tab-content commits-panel">
              {normalizedCommits.length === 0 ? (
                <div className="ai-summary-box">
                  <p className="summary-text">동기화된 커밋 이력이 없습니다.</p>
                </div>
              ) : (
                <div className="commit-history-viewport">
                  {/* 상단 키워드 카테고리 툴바 */}
                  <div className="commit-filter-toolbar">
                    <div className="filter-tabs">
                      {COMMIT_FILTER_TABS.filter(
                        (tab) =>
                          tab.key === "ALL" ||
                          commitCategoryCounts[tab.key] > 0,
                      ).map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          className={`filter-chip ${
                            selectedCommitCategory === tab.key
                              ? "is-active"
                              : ""
                          }`}
                          onClick={() => handleSelectCommitCategory(tab.key)}
                        >
                          {tab.label} ({commitCategoryCounts[tab.key]})
                        </button>
                      ))}
                    </div>

                    {commitCategoryCounts.MERGE > 0 && (
                      <label className="merge-toggle-label">
                        <input
                          type="checkbox"
                          checked={hideMergeLogs}
                          onChange={(e) => {
                            setHideMergeLogs(e.target.checked);
                            setVisibleCommitCount(20);
                          }}
                        />
                        <span>HIDE MERGES ({commitCategoryCounts.MERGE})</span>
                      </label>
                    )}
                  </div>

                  {/* 고정 높이 내부 스크롤 리스트 */}
                  <div
                    className="commits-timeline"
                    ref={commitScrollBoxRef}
                    onScroll={handleCommitListScroll}
                  >
                    {displayedCommits.length === 0 ? (
                      <div className="commit-empty-state">
                        선택한 카테고리에 해당하는 커밋 이력이 없습니다.
                      </div>
                    ) : (
                      displayedCommits.map((item, idx) => {
                        const { commit, category, matchedKeyword } = item;

                        return (
                          <div key={commit.sha || idx} className="commit-item">
                            <div className="commit-meta">
                              <div className="commit-badges">
                                <span className="commit-sha">
                                  #{commit.sha}
                                </span>
                                <span
                                  className={`commit-category-badge is-${category.toLowerCase()}`}
                                >
                                  {matchedKeyword || category}
                                </span>
                              </div>
                              <span className="commit-date">
                                {new Date(commit.date).toLocaleString("ko-KR", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>

                            <p className="commit-msg">{commit.message}</p>

                            <div className="commit-author">
                              <span>BY: {commit.author}</span>
                              {commit.url && (
                                <a
                                  href={commit.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="commit-link"
                                >
                                  VIEW COMMIT ↗
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* 하단 추가 로드 버튼 */}
                  {hasMoreCommits && (
                    <button
                      type="button"
                      className="btn-load-more-commits"
                      onClick={() => setVisibleCommitCount((prev) => prev + 20)}
                    >
                      + LOAD MORE COMMITS (
                      {filteredCommits.length - visibleCommitCount} REMAINING)
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* 하단 CTA 배너 */}
        <section className="detail-footer-banner">
          <div className="banner-info">
            <span className="sub-label">CONTINUE EXPLORING</span>
            <h2>READY TO SEE MORE WORKS?</h2>
          </div>
          <Link href="/works" className="cta-btn">
            RETURN TO WORKS INDEX →
          </Link>
        </section>
      </article>
    </>
  );
}
