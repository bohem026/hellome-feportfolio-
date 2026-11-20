export type ChatSender = "bot" | "user";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  timestamp: string;
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
