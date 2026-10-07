'use client';

import { useState } from 'react';
import { INITIAL_BOT_MESSAGES, QUICK_ACTIONS } from '@/constants';
import { Message, ProposalFormState } from '@/types';

export function useContactPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_BOT_MESSAGES);
  const [formData, setFormData] = useState<ProposalFormState>({
    name: '',
    email: '',
    details: '',
  });

  // 프리셋 키워드 클릭 시 챗봇 메시지 처리
  const handleQuickAction = (actionKeyword: string) => {
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: actionKeyword,
      time: 'JUST NOW',
    };

    let replyText = '';
    if (actionKeyword.includes('채용 관련 질문')) {
      replyText = '주후산 개발자는 React, Next.js, TypeScript 기반의 프론트엔드 포지션을 선호하며, 서울/수도권 및 리모트 근무가 가능합니다.';
    } else if (actionKeyword.includes('이력서 / 포트폴리오 다운로드')) {
      replyText = '최신 노션 이력서 및 PDF 포트폴리오 링크를 준비했습니다. 아래 버튼 및 이메일 전송 폼을 이용해 주세요.';
    } else if (actionKeyword.includes('1:1 커피챗 / 면접 요청')) {
      replyText = '우측 하단 [DISPATCH TRANSMISSION] 폼에 담당자명과 이메일을 남겨주시면 24시간 이내에 회신드리겠습니다.';
    } else {
      replyText = '요청하신 내용을 확인했습니다. 우측 폼을 작성해주시면 상세 내용을 안내해 드리겠습니다.';
    }

    const botMsg: Message = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: replyText,
      time: 'JUST NOW',
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  // 제안 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      alert('성함과 이메일을 입력해주세요.');
      return;
    }
    alert(`[제안 전송 완료] ${formData.name}님의 입사/프로젝트 제안이 성공적으로 전달되었습니다.`);
    setFormData({ name: '', email: '', details: '' });
  };

  return {
    messages,
    quickActions: QUICK_ACTIONS,
    formData,
    setFormData,
    handleQuickAction,
    handleSubmit,
  };
}