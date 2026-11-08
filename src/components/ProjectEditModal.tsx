"use client";

import React, { useState, useEffect } from "react";
import { Project, ProjectStatus } from "@/types";
import "./ProjectEditModal.scss"; // 프로젝트 스타일 파일에 맞게 지정

interface ProjectEditModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (updatedProject: Project) => Promise<void>;
}

export function ProjectEditModal({
  isOpen,
  project,
  onClose,
  onSave,
}: ProjectEditModalProps) {
  const [formData, setFormData] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        categories: Array.isArray(project.categories) ? project.categories : [],
      });
    }
  }, [project]);

  if (!isOpen || !formData) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // 쉼표 기반 분할 처리
    const categoryArray = rawValue.split(",").map((item) => item.trim());
    setFormData((prev) =>
      prev ? { ...prev, categories: categoryArray } : null,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Save project error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container edit-modal">
        <header className="modal-header">
          <h3>PROJECT EDIT SPECIMEN #{formData.id}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>PROJECT TITLE</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>IMAGE URL (THUMBNAIL)</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CATEGORIES (COMMA SEPARATED)</label>
            <input
              type="text"
              name="categories"
              value={formData.categories.join(", ")}
              onChange={handleCategoriesChange}
              placeholder="React, TypeScript, Next.js"
            />
          </div>

          <div className="form-group">
            <label>PUBLISH STATUS</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          <div className="form-group">
            <label>DEMO URL</label>
            <input
              type="text"
              name="demo_url"
              value={formData.demo_url || ""}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label>DESCRIPTION</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
