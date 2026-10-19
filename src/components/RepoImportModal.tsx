"use client";

import React, { useState } from "react";
import { GithubRepo } from "@/types";
import "./RepoImportModal.scss";

interface RepoImportModalProps {
  isOpen: boolean;
  isLoading: boolean;
  repositories: GithubRepo[];
  onClose: () => void;
  onArchive: (repo: GithubRepo) => void;
}

export function RepoImportModal({
  isOpen,
  isLoading,
  repositories,
  onClose,
  onArchive,
}: RepoImportModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

  if (!isOpen) return null;

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="repo-modal-overlay">
      <div className="repo-modal-container">
        <div className="modal-header">
          <h2>[IMPORT FROM GITHUB REPOSITORY]</h2>
          <button className="close-btn" onClick={onClose}>
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
                    className={`repo-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedRepo(repo)}
                  >
                    <div className="repo-card-header">
                      <strong className="repo-title">{repo.name}</strong>
                      <span className="repo-stars">
                        ★ {repo.stargazersCount}
                      </span>
                    </div>

                    <p className="repo-desc">
                      {repo.description ||
                        "설명이 제공되지 않은 레포지토리입니다."}
                    </p>

                    <div className="repo-meta">
                      <span className="repo-lang">
                        ● {repo.language || "Plain Text"}
                      </span>
                      <span className="repo-date">
                        UPDATED:{" "}
                        {new Date(repo.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            CANCEL
          </button>
          <button
            className="btn-confirm"
            disabled={!selectedRepo}
            onClick={() => selectedRepo && onArchive(selectedRepo)}
          >
            START ARCHIVING
          </button>
        </div>
      </div>
    </div>
  );
}
