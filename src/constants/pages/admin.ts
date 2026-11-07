import { Project, Inquiry } from "@/types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "EST Camp Renewal Main Page",
    description:
      "Eastsoft 국비 IT 부트캠프 홍보 메인 페이지 리뉴얼 프로젝트입니다.",
    categories: ["HTML5", "CSS3", "JavaScript"],
    status: "PUBLISHED",
    image_url:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Gitkkal-naneun Recipe",
    description: "AI 기반 맞춤형 레시피 생성 및 일주일 식단 관리 플랫폼입니다.",
    categories: ["React", "TypeScript", "Supabase"],
    status: "PUBLISHED",
    image_url:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Developer Portfolio V4",
    description:
      "Next.js 및 Supabase 기반의 브루탈리즘 컨셉 개발자 포트폴리오입니다.",
    categories: ["Next.js", "SCSS", "TypeScript"],
    status: "DRAFT",
    image_url:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "req-1",
    sender: "Klara Lindqvist",
    role: "Talent Lead @ Aone Studios, Stockholm",
    message:
      "We reviewed the Veloce Racing case study. Seeking Design Director for Q4 European flagship digital revamp.",
    timeAgo: "NEW - 10M AGO",
    status: "NEW",
  },
  {
    id: "req-2",
    sender: "Marcus Vance",
    role: "Partner @ Pentagram NYC",
    message:
      "Confirmed sync for prospective collaborative pitch on global automotive client identity system.",
    timeAgo: "SCHEDULED - TOMORROW 15:00",
    status: "SCHEDULED",
  },
  {
    id: "req-3",
    sender: "Elena Rostova",
    role: "Head of Brand @ Ledger, Paris",
    message:
      "Initial NDA and rate deck dispatched. Waiting on security validation review.",
    timeAgo: "RESPONDED - 2D AGO",
    status: "RESPONDED",
  },
];
