export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
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
