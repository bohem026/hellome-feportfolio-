'use client';

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Toast.scss';

export type ToastType = 'success' | 'warning' | 'danger';

export interface ToastProps {
  open: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({
  open,
  message,
  type = 'success',
  duration = 4000,
  onClose,
}: ToastProps) {
  // MUI Alert severity 타입 매핑
  const severityMap = {
    success: 'success' as const,
    warning: 'warning' as const,
    danger: 'error' as const,
  };

  const tagTextMap = {
    success: '// SYSTEM NOTICE [CONFIRM]',
    warning: '// SYSTEM WARNING [NOTICE]',
    danger: '// SYSTEM ALERT [ERROR]',
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // 우하단 배치
      className="custom-toast-snackbar"
    >
      <Alert
        onClose={onClose}
        severity={severityMap[type]}
        variant="outlined"
        className={`custom-toast-alert type-${type}`}
      >
        <div className="toast-content">
          <span className="toast-tag">{tagTextMap[type]}</span>
          <p className="toast-message">{message}</p>
        </div>
      </Alert>
    </Snackbar>
  );
}