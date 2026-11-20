export type ChatSender = "bot" | "user";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  time: string;
  text: string;
  actionType?: "resume_download" | "works_link";
}

export interface QuickAction {
  label: string;
  template: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  // 추가: 스팸 봇 차단용 Honeypot 숨김 필드
  website: string;
}

export const INITIAL_FORM_STATE: ContactFormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

/**
 * 무분별 메시지 전송 방지 관련 상수
 */
const COOLDOWN_STORAGE_KEY = "hellome_dispatch_cooldown_until";
// 3분 재전송 제한
const COOLDOWN_DURATION_MS = 3 * 60 * 1000;
