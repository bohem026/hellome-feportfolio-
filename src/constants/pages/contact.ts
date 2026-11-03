import { Message, QuickAction } from "@/types";

export const INITIAL_BOT_MESSAGES: Message[] = [
  {
    id: "msg-1",
    sender: "bot",
    text: "안녕하세요! 프론트엔드 엔지니어 주후산의 채용 어시스턴트 봇입니다. 채용 조건, 이력서 다운로드, 또는 입사/프로젝트 제안을 원하시면 아래 키워드를 클릭하시거나 메시지를 남겨주세요.",
    time: "JUST NOW",
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "• Discuss full-time staff role",
    keyword: "Discuss full-time staff role (채용 관련 질문)",
  },
  {
    label: "• Request resume & portfolio",
    keyword: "Request resume & portfolio (이력서 / 포트폴리오 다운로드)",
  },
  {
    label: "• Schedule 15-min intro sync",
    keyword: "Schedule 15-min introductory sync (1:1 커피챗 / 면접 요청)",
  },
];
