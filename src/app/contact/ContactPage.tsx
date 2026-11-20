"use client";

import React from "react";
import Link from "next/link";
import { useContactPage } from "@/hooks";
import { Toast } from "@/components/Toast";
import "./ContactPage.scss";

export function ContactPage() {
  const {
    formData,
    isSubmitting,
    isBotTyping,
    chatMessages,
    chatViewportRef,
    nameInputRef,
    toastState,
    handleCloseToast,
    handleInputChange,
    handleQuickAction,
    handleDownloadResume,
    handleSubmitInquiry,
  } = useContactPage();

  return (
    <div className="contact-container">
      {/* 1. HERO HEADER */}
      <header className="contact-hero">
        <span className="section-index">
          // INQUIRY ROUTER / RECRUITER DESK
        </span>
        <h1 className="hero-title">
          INITIATE
          <br />
          DIALOGUE
        </h1>
        <p className="hero-subtitle">
          프론트엔드 포지션 채용 제안 및 프로젝트 문의를 위한 전용 자동화
          채널입니다.
        </p>
      </header>

      {/* 2. 4 METRIX CARD & PROFILE BAR */}
      <section className="contact-meta-section">
        <div className="meta-grid">
          <div className="meta-card">
            <span className="meta-label">01 // DIRECT ACCESS</span>
            <strong className="meta-value">microbin98@gmail.com</strong>
            <span className="meta-sub">EMAIL CONTACT</span>
          </div>

          <div className="meta-card">
            <span className="meta-label">02 // TIMEZONE</span>
            <strong className="meta-value">UTC +09:00</strong>
            <span className="meta-sub">SEOUL, KOREA</span>
          </div>

          <div className="meta-card">
            <span className="meta-label">03 // RESPONSE TIME</span>
            <strong className="meta-value">24 HOURS</strong>
            <span className="meta-sub">DAILY MONITORED</span>
          </div>

          <div className="meta-card">
            <span className="meta-label">04 // AVAILABILITY</span>
            <strong className="meta-value is-green">OPEN FOR ROLES</strong>
            <span className="meta-sub">FULL-TIME &amp; CONTRACT</span>
          </div>
        </div>

        <div className="identity-strip">
          <div className="identity-left">
            <div className="monogram-circle">JH</div>
            <div className="identity-text">
              <strong>JOO HU SAN</strong>
              <span>Junior Frontend Engineer &amp; Creative Architect</span>
            </div>
          </div>
          <span className="verified-badge">VERIFIED ENTITY</span>
        </div>
      </section>

      {/* 3. ASSISTANT & DISPATCH FORM */}
      <section className="contact-dispatch-section">
        <div className="dispatch-box">
          <div className="box-header">
            <span className="parser-title">
              PORTFOLIO ASSISTANT V2.4 // TALENT PARSER
            </span>
            <span className="online-status">● ONLINE / AGENT READY</span>
          </div>

          {/* CHAT-BOT */}
          <div className="chat-viewport" ref={chatViewportRef}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${
                  msg.sender === "user" ? "is-user" : "is-bot"
                }`}
              >
                <div className="chat-bubble">
                  <span className="msg-sender">
                    {msg.sender === "bot" ? "ASSISTANT BOT" : "VISITOR"} —{" "}
                    {msg.timestamp}
                  </span>
                  <p>{msg.text}</p>

                  {/* 이력서 즉시 다운로드 액션 카드 */}
                  {msg.actionType === "resume_download" && (
                    <div className="bubble-inline-actions">
                      <button
                        type="button"
                        className="btn-resume-download"
                        onClick={handleDownloadResume}
                      >
                        RESUME_2026.PDF ↓
                      </button>
                      <Link href="/works" className="btn-works-jump">
                        VIEW WORKS ARCHIVE ↗
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* 봇 입력 진행 애니메이션 스켈레톤 UI */}
            {isBotTyping && (
              <div className="chat-bubble-row is-bot">
                <div className="chat-bubble is-typing">
                  <span className="msg-sender">ASSISTANT BOT — TYPING...</span>
                  <div className="typing-skeleton">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              </div>
            )}

            {/* 챗봇 뷰포트 내부 인라인 퀵 액션 말풍선 */}
            <div className="inline-quick-prompts">
              <span className="prompt-guide">SELECT QUICK INTENT:</span>
              <div className="prompt-chips">
                <button
                  type="button"
                  className="prompt-chip-btn"
                  disabled={isBotTyping || isSubmitting}
                  onClick={() => handleQuickAction("hiring")}
                >
                  + 채용 제안 양식 불러오기
                </button>
                <button
                  type="button"
                  className="prompt-chip-btn"
                  disabled={isBotTyping || isSubmitting}
                  onClick={() => handleQuickAction("project")}
                >
                  + 프로젝트 협업 문의
                </button>
                <button
                  type="button"
                  className="prompt-chip-btn"
                  disabled={isBotTyping || isSubmitting}
                  onClick={() => handleQuickAction("resume")}
                >
                  + 이력서 다운로드
                </button>
              </div>
            </div>
          </div>

          {/* 1. 구직 제안 입력 폼 */}
          <form
            className="dispatch-form"
            onSubmit={handleSubmitInquiry}
            noValidate
          >
            {/* 스팸 봇 차단용 Honeypot 숨김 필드 */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <div className="form-row-two">
              <div className="form-group">
                <label htmlFor="senderName" className="field-label">
                  YOUR NAME &amp; TITLE *
                </label>
                <input
                  ref={nameInputRef}
                  id="senderName"
                  name="senderName"
                  type="text"
                  placeholder="e.g. Hong Gil Dong, Tech Lead"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="senderEmail" className="field-label">
                  WORK EMAIL *
                </label>
                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="field-label">
                INQUIRY / OPPORTUNITY DETAILS *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Outline scope, timeline, compensation range, or questions..."
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="btn-dispatch"
              disabled={isSubmitting}
            >
              {isSubmitting ? "DISPATCHING..." : "DISPATCH TRANSMISSION →"}
            </button>
          </form>
        </div>
      </section>

      {/* 4. RECRUITMENT FAQ */}
      <section className="contact-faq-section">
        <div className="faq-header">
          <span className="section-index">// DIRECT ANSWERS</span>
          <h2>RECRUITMENT FAQ</h2>
        </div>

        <div className="faq-list">
          <div className="faq-card">
            <span className="faq-index">/ 01 COLLABORATION TERMS</span>
            <h3>FULL-TIME OR CONTRACT?</h3>
            <p>
              프론트엔드 정규직 포지션 및 프로젝트 단위의 웹 아키텍처
              개발·리뉴얼 수주 모두 열려있습니다.
            </p>
          </div>

          <div className="faq-card">
            <span className="faq-index">/ 02 TECH STACK REQUIREMENT</span>
            <h3>PRIMARY TECH STACK?</h3>
            <p>
              React, Next.js, TypeScript, SCSS, Supabase, PostgreSQL 환경을
              주력으로 다룹니다.
            </p>
          </div>

          <div className="faq-card">
            <span className="faq-index">/ 03 WORK LOCATION</span>
            <h3>LOCATION &amp; RELOCATION</h3>
            <p>서울 및 수도권 근무와 하이브리드/원격 근무를 모두 지원합니다.</p>
          </div>
        </div>
      </section>

      {/* Toast 알림 컴포넌트 */}
      <Toast
        open={toastState.open}
        message={toastState.message}
        type={toastState.type}
        onClose={handleCloseToast}
      />
    </div>
  );
}
