import { ChatMessage, QuickAction } from "@/types";

export const INITIAL_BOT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "bot",
    text: "안녕하세요! 프론트엔드 엔지니어 주후산의 채용 어시스턴트 봇입니다. 채용 및 이력서 관련 문의를 원하시면 아래 키워드를 클릭하시거나 메시지를 남겨주세요.",
    time: "JUST NOW",
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "채용 제안",
    template:
      "프론트엔드 개발자 포지션 채용 제안을 드리고자 연락드립니다.\n- 회사/팀 소개: \n- 주요 업무 및 기술 스택: \n- 채용 절차: ",
  },
  {
    label: "프로젝트 협업 문의",
    template:
      "신규 웹 서비스 개발 협업 문의를 드립니다.\n- 프로젝트 개요: \n- 예상 일정: ",
  },
  {
    label: "이력서 다운로드",
    template: "이력서 다운로드 링크를 요청드립니다.",
  },
];
