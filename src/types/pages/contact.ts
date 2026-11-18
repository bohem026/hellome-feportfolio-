export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export interface QuickAction {
  label: string;
  keyword: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}
