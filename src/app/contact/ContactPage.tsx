"use client";

import React, { useState } from "react";
import "./ContactPage.scss";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "안녕하세요! 프론트엔드 엔지니어 주후산의 채용 어시스턴트 봇입니다. 채용 조건, 이력서 다운로드, 또는 입사/프로젝트 제안을 원하시면 아래 키워드를 클릭하시거나 메시지를 남겨주세요.",
      time: "JUST NOW",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });

  // 프리셋 키워드 클릭 시 챗봇 메세지 처리
  const handleQuickAction = (actionText: string) => {
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: actionText,
      time: "JUST NOW",
    };

    let replyText = "";
    if (actionText.includes("채용 관련 질문")) {
      replyText =
        "주후산 개발자는 React, Next.js, TypeScript 기반의 프론트엔드 포지션을 선호하며, 서울/수도권 및 리모트 근무가 가능합니다.";
    } else if (actionText.includes("이력서 / 포트폴리오 다운로드")) {
      replyText =
        "최신 노션 이력서 및 PDF 포트폴리오 링크를 준비했습니다. 아래 버튼 및 이메일 전송 폼을 이용해 주세요.";
    } else if (actionText.includes("1:1 커피챗 / 면접 요청")) {
      replyText =
        "우측 하단 [DISPATCH TRANSMISSION] 폼에 담당자명과 이메일을 남겨주시면 24시간 이내에 회신드리겠습니다.";
    } else {
      replyText =
        "요청하신 내용을 확인했습니다. 우측 폼을 작성해주시면 상세 내용을 안내해 드리겠습니다.";
    }

    const botMsg: Message = {
      id: `bot-${Date.now() + 1}`,
      sender: "bot",
      text: replyText,
      time: "JUST NOW",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert("성함과 이메일을 입력해주세요.");
      return;
    }
    alert(
      `[제안 전송 완료] ${formData.name}님의 입사/프로젝트 제안이 성공적으로 전달되었습니다.`,
    );
    setFormData({ name: "", email: "", details: "" });
  };

  return (
    <div className="contact-container">
      {/* Header */}
      {/* <header className="header">
        <div className="header__left">
          <span className="logo">ARCH™</span>
          <span className="sub-tag">
            AUTOMATED TALENT INTAKE & DISCOVERY DESK
          </span>
        </div>
        <nav className="header__nav">
          <a href="/" className="nav-link">
            INDEX
          </a>
          <a href="/works" className="nav-link">
            WORKS
          </a>
          <a href="/about" className="nav-link">
            ABOUT
          </a>
          <a href="/contact" className="nav-link active">
            CONTACT ASSISTANT
          </a>
          <a href="/admin" className="nav-link">
            CMS CONSOLE
          </a>
        </nav>
        <div className="header__right">
          <span className="status-badge">● AVAILABLE FOR Q3/Q4</span>
          <div className="user-profile">
            <span className="avatar">JH</span>
          </div>
        </div>
      </header> */}

      {/* Main Grid */}
      <div className="contact-layout">
        {/* Left Side: Summary & Quick Info */}
        <section className="info-side">
          <span className="section-tag">
            // INQUIRY ROUTER / RECRUITER DESK
          </span>
          <h1 className="main-title">
            INITIATE
            <br />
            DIALOGUE
          </h1>
          <p className="intro-p">
            프론트엔드 포지션 채용 제안, 프로젝트 문의 또는 스태프 리더십 요청을
            위한 전용 자동화 채널입니다.
          </p>

          <div className="info-grid">
            <div className="info-box">
              <span className="box-tag">01 // DIRECT ACCESS</span>
              <a href="mailto:juhusan@example.com" className="box-val bold">
                juhusan@example.com
              </a>
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
                    {msg.sender === "bot" ? "ASSISTANT BOT" : "RECRUITER"} -{" "}
                    {msg.time}
                  </span>
                  <p className="msg-text">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Preset Actions / Quick Buttons */}
            <div className="quick-actions">
              <span className="action-title">QUICK DISPATCH ACTIONS:</span>
              <div className="btn-wrap">
                <button
                  onClick={() =>
                    handleQuickAction(
                      "Discuss full-time staff role (채용 관련 질문)",
                    )
                  }
                >
                  • Discuss full-time staff role
                </button>
                <button
                  onClick={() =>
                    handleQuickAction(
                      "Request resume & portfolio (이력서 / 포트폴리오 다운로드)",
                    )
                  }
                >
                  • Request resume & portfolio
                </button>
                <button
                  onClick={() =>
                    handleQuickAction(
                      "Schedule 15-min introductory sync (1:1 커피챗 / 면접 요청)",
                    )
                  }
                >
                  • Schedule 15-min intro sync
                </button>
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>WORK EMAIL</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="input-group">
                <label>INQUIRY / OPPORTUNITY DETAILS</label>
                <textarea
                  rows={3}
                  placeholder="Outline scope, timeline, compensation range, or questions..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
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
            <p>
              프론트엔드 정규직 포지션 및 프로젝트 단위의 아키텍처 컨설팅 수주
              모두 열려있습니다.
            </p>
          </div>
          <div className="faq-item">
            <span className="num">/ 02 TECH STACK REQUIREMENT</span>
            <h3>PRIMARY TECH STACK?</h3>
            <p>
              React, Next.js, TypeScript, SCSS, Supabase 환경을 주력으로
              다룹니다.
            </p>
          </div>
          <div className="faq-item">
            <span className="num">/ 03 WORK LOCATION</span>
            <h3>LOCATION & RELOCATION</h3>
            <p>
              서울 및 수도권 온사이트 근무와 하이브리드/원격 근무를 모두
              지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="footer">
        <div>ATELIER MONOCHROME / SWISS MODERN DESIGN SYSTEMS</div>
        <div>LAT 37.5665° N, LON 126.9780° E</div>
        <div>© 2026 ALL RIGHTS RESERVED</div>
      </footer> */}
    </div>
  );
}