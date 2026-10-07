'use client';

import React from 'react';
import { useAdminPage } from '@/hooks';
import './AdminPage.scss';

export function AdminPage() {
  const {
    projects,
    inquiries,
    activeTab,
    setActiveTab,
    handleDeleteProject,
    handleToggleStatus,
    handleRemoveInquiry,
  } = useAdminPage();

  return (
    <div className="admin-container">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <span className="sidebar-title">CMS OPERATING CORE</span>
          <ul>
            <li
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              [01] Overview
            </li>
            <li
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              [02] Projects Library
            </li>
            <li
              className={activeTab === 'inquiries' ? 'active' : ''}
              onClick={() => setActiveTab('inquiries')}
            >
              [03] Client Inquiries
            </li>
          </ul>
        </aside>

        {/* Main Content Dashboard */}
        <main className="admin-main">
          <div className="console-bar">
            <span>[CONSOLE CONTROL V4.1] ● LIVE SYSTEM DISPATCH</span>
            <div className="console-actions">
              <button className="btn-outline">RE-INDEX CACHE</button>
              <button className="btn-solid">+ CREATE NEW WORK</button>
            </div>
          </div>

          <h1 className="page-title">EDITORIAL CMS.</h1>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="label">TOTAL IMPRESSIONS</span>
              <div className="value">48.2K</div>
              <span className="sub">↑ +14.8% TREND</span>
            </div>
            <div className="metric-box">
              <span className="label">ACTIVE CASE STUDIES</span>
              <div className="value">{projects.length}</div>
              <span className="sub">INDEXED & PUBLISHED</span>
            </div>
            <div className="metric-box">
              <span className="label">PENDING INQUIRIES</span>
              <div className="value">07</div>
              <span className="sub">NEEDS REVIEW</span>
            </div>
            <div className="metric-box">
              <span className="label">RECRUITER INQUIRIES</span>
              <div className="value">{inquiries.length}</div>
              <span className="sub">JOB PROPOSALS</span>
            </div>
          </div>

          {/* Content Split: Projects Table & Inquiries Queue */}
          <div className="content-split">
            {/* Projects Library Table */}
            <div className="projects-management-section">
              <div className="section-title-bar">
                <span>[LIBRARY DISPATCH]</span>
                <span>{projects.length} ITEMS RECORDED</span>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>PREVIEW</th>
                      <th>PROJECT DETAILS</th>
                      <th>CATEGORY</th>
                      <th>STATUS</th>
                      <th>MANAGEMENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr key={proj.id}>
                        <td>
                          <img src={proj.imageUrl} alt={proj.title} className="thumb" />
                        </td>
                        <td>
                          <strong className="title">{proj.title}</strong>
                          <span className="id">ID: {proj.id} // {proj.visibility}</span>
                        </td>
                        <td>{proj.category}</td>
                        <td>
                          <span className={`status-badge-inline ${proj.status.toLowerCase()}`}>
                            ● {proj.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button onClick={() => handleToggleStatus(proj.id)}>상태변경</button>
                            <button className="delete" onClick={() => handleDeleteProject(proj.id)}>삭제</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiries Queue Sidebar */}
            <div className="inquiries-queue-section">
              <div className="section-title-bar">
                <span>[INQUIRIES QUEUE]</span>
                <span className="live-dot">● LIVE STREAM</span>
              </div>

              <div className="queue-list">
                {inquiries.map((inq) => (
                  <div className="queue-card" key={inq.id}>
                    <div className="queue-top">
                      <span className="tag">{inq.timeAgo}</span>
                      <button className="close-btn" onClick={() => handleRemoveInquiry(inq.id)}>×</button>
                    </div>
                    <h3>{inq.sender}</h3>
                    <span className="role">{inq.role}</span>
                    <p className="msg">"{inq.message}"</p>
                    <div className="queue-actions">
                      <button className="resp-btn">RESPOND</button>
                      <button className="arch-btn" onClick={() => handleRemoveInquiry(inq.id)}>ARCHIVE</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}