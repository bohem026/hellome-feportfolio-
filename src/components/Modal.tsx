"use client";

import React from "react";
import "./Modal.scss";

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "confirm" | "warning" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal({
  isOpen,
  title,
  message,
  confirmText = "CONFIRM",
  cancelText = "CANCEL",
  type = "confirm",
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className={`modal-container type-${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span className="modal-tag">
            // SYSTEM NOTICE [{type.toUpperCase()}]
          </span>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-message">{message}</p>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`btn-confirm btn-${type}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}