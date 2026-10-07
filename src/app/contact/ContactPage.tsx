'use client';

import React from 'react';
import { useContactPage } from '@/hooks';
import './ContactPage.scss';

export function ContactPage() {
  const {
    messages,
    quickActions,
    formData,
    setFormData,
    handleQuickAction,
    handleSubmit,
  } = useContactPage();

  return (
    <div className="contact-container">
      {/* Main Grid */}
      <div className="contact-layout">
        {/* Left Side: Summary & Quick Info */}
        <section className="info-side">
          <span className="section-tag">// INQUIRY ROUTER / RECRUITER DESK</span>
          <h1 className="main-title">INITIATE<br />DIALOGUE</h1>
          <p className="intro-p">
            프론트엔드 포지션 채용 제안, 프로젝트 문의 또는 스태프 리더십 요청을 위한 전용 자동화 채널입니다.
          </p>

          <div className="info-grid">
            <div className="info-box">
              <span className="box-tag">01 // DIRECT ACCESS</span>
              <a href="mailto:juhusan@example.com" className="box-val bold">juhusan@example.com</a>
              <span className="box-sub">EMAIL CONTACT</span>
            </div>
            <div className="info-box">
              <span className="box-tag">02 // TIMEZONE</span>
              <span className="box-val">UTC +09:00</span>
              <span className="box-sub">SEOUL, KOREA</span>
            </div>
            <div className="info-box">
              <span className="box-tag">03 // RESPONSE TIME</span>
              <span className="box-val">&lt; 24 HOURS</span>
              <span className="box-sub">DAILY MONITORED</span>
            </div>
            <div className="info-box">
              <span className="box-tag">04 // AVAILABILITY</span>
              <span className="box-val active-text">OPEN FOR Q3/Q4</span>
              <span className="box-sub">FULL-TIME & CONTRACT</span>
            </div>
          </div>

          <div className="profile-badge-box">
            <div className="avatar-circle">JH</div>
            <div>
              <strong>JU HU SAN</strong>
              <span>Frontend Developer & Creative Engineer</span>
            </div>
            <span className="verified-tag">VERIFIED ENTITY</span>
          </div>
        </section>

        {/* Right Side: Chatbot + Proposal Form */}
        <section className="assistant-side">
          <div className="assistant-card">
            <div className="card-header">
              <span>PORTFOLIO ASSISTANT V2.4 // TALENT PARSER</span>
              <span className="online-badge">● ONLINE / AGENT READY</span>
            </div>

            {/* Chatbot Window */}
            <div className="chat-window">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                  <span className="sender-tag">
                    {msg.sender === 'bot' ? 'ASSISTANT BOT' : 'RECRUITER'} - {msg.time}
                  </span>
                  <p className="msg-text">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Preset Actions / Quick Buttons */}
            <div className="quick-actions">
              <span className="action-title">QUICK DISPATCH ACTIONS:</span>
              <div className="btn-wrap">
                {quickActions.map((action, idx) => (
                  <button key={idx} onClick={() => handleQuickAction(action.keyword)}>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries / Proposal Form */}
            <form className="proposal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group">
                  <label>YOUR NAME & TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g. Hong Gil Dong, Tech Lead"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>WORK EMAIL</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>INQUIRY / OPPORTUNITY DETAILS</label>
                <textarea
                  rows={3}
                  placeholder="Outline scope, timeline, compensation range, or questions..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <button type="submit" className="submit-btn">
                DISPATCH TRANSMISSION ➔
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Recruitment FAQ Section */}
      <section className="faq-section">
        <span className="section-tag">// DIRECT ANSWERS</span>
        <h2 className="section-title">RECRUITMENT FAQ</h2>

        <div className="faq-grid">
          <div className="faq-item">
            <span className="num">/ 01 COLLABORATION TERMS</span>
            <h3>FULL-TIME OR CONTRACT?</h3>
            <p>프론트엔드 정규직 포지션 및 프로젝트 단위의 아키텍처 컨설팅 수주 모두 열려있습니다.</p>
          </div>
          <div className="faq-item">
            <span className="num">/ 02 TECH STACK REQUIREMENT</span>
            <h3>PRIMARY TECH STACK?</h3>
            <p>React, Next.js, TypeScript, SCSS, Supabase 환경을 주력으로 다룹니다.</p>
          </div>
          <div className="faq-item">
            <span className="num">/ 03 WORK LOCATION</span>
            <h3>LOCATION & RELOCATION</h3>
            <p>서울 및 수도권 온사이트 근무와 하이브리드/원격 근무를 모두 지원합니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}