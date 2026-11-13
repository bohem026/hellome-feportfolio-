"use client";

import React, { useState } from "react";
import { GithubRepo } from "@/types";
import "./RepoImportModal.scss";

// 아카이빙 진행 상태 타입
export type ArchivingStep =
  | "IDLE"
  | "SYNCING_REPO"
  | "GENERATING_AI"
  | "COMPLETE";

// 추가: 아카이빙 상태 추가
interface RepoImportModalProps {
  isOpen: boolean;
  isLoading: boolean;
  isArchiving?: boolean;
  archivingStep?: ArchivingStep;
  repositories: GithubRepo[];
  onClose: () => void;
  onArchive: (repo: GithubRepo) => Promise<void> | void;
}

export function RepoImportModal({
  isOpen,
  isLoading,
  isArchiving = false,
  archivingStep = "IDLE",
  repositories,
  onClose,
  onArchive,
}: RepoImportModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

  if (!isOpen) return null;

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.repo_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((repo as any).description &&
        (repo as any).description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())),
  );

  const handleStartArchiving = async () => {
    if (!selectedRepo || isArchiving) return;
    await onArchive(selectedRepo);
  };

  return (
    <div className="repo-modal-overlay">
      <div className="repo-modal-container">
        {/* 아카이빙 로딩 */}
        {isArchiving && (
          <div className="archiving-loading-overlay">
            <div className="progress-box">
              <span className="badge">PROCESSING ARCHIVE</span>
              <h3>ARCHIVING SPECIMEN #{selectedRepo?.repo_name}</h3>

              <div className="steps-list">
                {/* STEP 1: 레포지토리 & 커밋 동기화 */}
                <div
                  className={`step-item ${
                    archivingStep === "SYNCING_REPO"
                      ? "active"
                      : archivingStep === "GENERATING_AI" ||
                          archivingStep === "COMPLETE"
                        ? "done"
                        : ""
                  }`}
                >
                  <span className="step-icon">
                    {archivingStep === "SYNCING_REPO"
                      ? "●"
                      : archivingStep === "GENERATING_AI" ||
                          archivingStep === "COMPLETE"
                        ? "✓"
                        : "○"}
                  </span>
                  <span className="step-label">
                    [STEP 1/2] Syncing Repository Metadata & Commit History...
                  </span>
                </div>

                {/* STEP 2: AI 트러블슈팅 분석 생성 */}
                <div
                  className={`step-item ${
                    archivingStep === "GENERATING_AI"
                      ? "active"
                      : archivingStep === "COMPLETE"
                        ? "done"
                        : ""
                  }`}
                >
                  <span className="step-icon">
                    {archivingStep === "GENERATING_AI"
                      ? "●"
                      : archivingStep === "COMPLETE"
                        ? "✓"
                        : "○"}
                  </span>
                  <span className="step-label">
                    [STEP 2/2] Generating Fact-Based AI Troubleshooting
                    Report...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 추가: 활성화 조건에 아카이빙 상태 추가 */}
        <div className="modal-header">
          <h2>[IMPORT FROM GITHUB REPOSITORY]</h2>
          <button
            className="close-btn"
            onClick={onClose}
            disabled={isArchiving}
          >
            ×
          </button>
        </div>

        <div className="modal-search-bar">
          <input
            type="text"
            placeholder="Search repository name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="modal-content">
          {isLoading ? (
            <div className="modal-loading">
              <span>● LOADING PUBLIC REPOSITORIES...</span>
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="modal-empty">
              <span>NO PUBLIC REPOSITORIES FOUND.</span>
            </div>
          ) : (
            <div className="repo-list">
              {filteredRepos.map((repo) => {
                const isSelected = selectedRepo?.id === repo.id;

                return (
                  <div
                    key={repo.id}
                    className={`repo-card ${isSelected ? "selected" : ""} ${
                      isArchiving ? "disabled" : ""
                    }`}
                    onClick={() => !isArchiving && setSelectedRepo(repo)}
                  >
                    <div className="repo-card-header">
                      <strong className="repo-title">{repo.repo_name}</strong>
                      <span className="repo-stars">★ {repo.stars}</span>
                    </div>

                    <p className="repo-desc">
                      {(repo as any).description || "NO DESCRIPTION PROVIDED."}
                    </p>

                    <div className="repo-meta">
                      <span className="repo-lang">
                        ●{" "}
                        {Array.isArray(repo.languages) &&
                        repo.languages.length > 0
                          ? repo.languages.slice(0, 3).join(", ")
                          : "Plain Text"}
                      </span>
                      <span className="repo-date">
                        UPDATED: {new Date(repo.pushed_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="modal-footer">
          {/* 추가: 활성화 조건에 아카이빙 상태 추가 */}
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={isArchiving}
          >
            CANCEL
          </button>
          <button
            className="btn-confirm"
            disabled={!selectedRepo || isArchiving}
            onClick={handleStartArchiving}
          >
            {isArchiving ? "PROCESSING..." : "START ARCHIVING"}
          </button>
        </div>
      </div>
    </div>
  );
}
