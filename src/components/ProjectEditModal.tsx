"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Project, ProjectStatus } from "@/types";
import "./ProjectEditModal.scss";

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
  const supabase = createClient();
  const [formData, setFormData] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        categories: Array.isArray(project.categories) ? project.categories : [],
      });
    }
  }, [project]);

  if (!isOpen || !formData) return null;

  /**
   * 변경 사항 반영
   * @param e
   */
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

  /**
   * AI description 생성 버튼 핸들러
   * @returns
   */
  const handleGenerateAiDescription = async () => {
    if (!formData) return;
    setIsAiLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-ai-description",
        {
          body: {
            repoName: formData.title,
            categories: formData.categories,
            description: formData.description,
          },
        },
      );

      if (error) throw error;

      // OpenAI 응답 메시지 추출 후 바인딩
      const aiText =
        data?.choices?.[0]?.message?.content ||
        data?.summary ||
        data?.description ||
        data;

      if (typeof aiText === "string" && aiText.trim() !== "") {
        setFormData((prev) =>
          prev ? { ...prev, description: aiText.trim() } : null,
        );
      }
    } catch (err: any) {
      console.error("AI Description generation failed:", err);
      alert(`AI 요약 생성 중 오류가 발생했습니다: ${err.message || err}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  /**
   * 변경 사항 db에 저장
   * @param e
   * @returns
   */
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
            <label>THUMBNAIL URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CATEGORIES</label>
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

          {/* Description: 원클릭 AI 요약 버튼 */}
          <div className="form-group">
            <div className="label-with-action">
              <label>DESCRIPTION</label>
              <button
                type="button"
                className="ai-gen-btn"
                onClick={handleGenerateAiDescription}
                disabled={isAiLoading}
              >
                {isAiLoading ? "GENERATING..." : "✨ AI AUTO SUMMARY"}
              </button>
            </div>
            <textarea
              name="description"
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="프로젝트 요약 설명을 입력하세요..."
            />
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting || isAiLoading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || isAiLoading}
            >
              {isSubmitting ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
