"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { useProjects } from "../common/useProjects";
import {
  FEATURED_WORKS,
  PROCESS_STEPS,
  // ENGINEERING_FAQS,
  KINETIC_KEYWORDS,
  DOSSIER_TERMINAL_ENTRIES,
  ENGINEERING_FAQS,
} from "@/constants";
import { WorkItem, ProcessItem, FAQItem, ShowcaseItem } from "@/types";

export function useMainPage() {
  const { projects, isLoading: isProjectsLoading } = useProjects();
  const featuredWorks = FEATURED_WORKS as WorkItem[];
  const processSteps = PROCESS_STEPS as ProcessItem[];
  const engineeringFAQs = ENGINEERING_FAQS as FAQItem[];

  // 1. 제자리 회전 헤드라인 인덱스
  const [keywordIdx, setKeywordIdx] = useState(0);
  // 2. 배경 썸네일 슬라이드 인덱스
  const [bgSlideIdx, setBgSlideIdx] = useState(0);
  // 3. 마우스 스포트라이트 그리드 좌표
  const heroRef = useRef<HTMLElement | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [entryIdx, setEntryIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const closingRef = useRef<HTMLElement | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  /**
   * PUBLISHED 프로젝트 필터링
   */
  const publishedProjects = useMemo(() => {
    if (isProjectsLoading) return [];
    return (projects || []).filter((p) => p.status === "PUBLISHED");
  }, [projects, isProjectsLoading]);

  /**
   * PUBLISHED 프로젝트 썸네일 목록 추출
   */
  const heroBgSlides = useMemo(() => {
    // 추가: DB 로딩 중에는 이미지 노출하지 않음 (깜빡임 방지)
    if (isProjectsLoading) return [];

    const published = (projects || []).filter(
      (p) => p.status === "PUBLISHED" && p.image_url,
    );

    if (published.length > 0) {
      return published.map((p) => ({
        id: p.id,
        title: p.title,
        imageUrl: p.image_url,
      }));
    }

    // 이미지 url 누락 방지용 폴백
    return featuredWorks.map((w) => ({
      id: w.id,
      title: w.title,
      imageUrl: w.imageUrl,
    }));
  }, [projects, isProjectsLoading, featuredWorks]);

  /**
   * Selected Showcase 큐레이션 상위 3개 데이터
   */
  const showcaseProjects: ShowcaseItem[] = useMemo(() => {
    if (isProjectsLoading) return [];

    if (publishedProjects.length > 0) {
      return publishedProjects.slice(0, 3).map((proj, idx) => ({
        id: proj.id,
        indexLabel: `SPECIMEN ${String(idx + 1).padStart(2, "0")}`,
        title: proj.title,
        categories: Array.isArray(proj.categories) ? proj.categories : [],
        imageUrl: proj.image_url,
        commitCount: Array.isArray(proj.repository?.commit_history)
          ? proj.repository.commit_history.length
          : 0,
        stars: proj.repository?.stars ?? 0,
        linkUrl: `/works/${proj.id}`,
      }));
    }

    return featuredWorks.slice(0, 3).map((w, idx) => ({
      id: w.id,
      indexLabel: `SPECIMEN ${String(idx + 1).padStart(2, "0")}`,
      title: w.title,
      categories: [w.category],
      imageUrl: w.imageUrl,
      commitCount: 0,
      stars: 0,
      linkUrl: w.linkUrl,
    }));
  }, [publishedProjects, isProjectsLoading, featuredWorks]);

  const totalPublishedCount =
    publishedProjects.length > 0
      ? publishedProjects.length
      : featuredWorks.length;

  /**
   * 헤드라인 회전 타이머 (2.8초)
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIdx((prev) => (prev + 1) % KINETIC_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  /**
   * 배경 썸네일 크로스페이드 슬라이드 타이머 (4.5초)
   */
  useEffect(() => {
    if (heroBgSlides.length <= 1) return;
    const slideInterval = setInterval(() => {
      setBgSlideIdx((prev) => (prev + 1) % heroBgSlides.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [heroBgSlides.length]);

  /**
   * CMD 터미널 타이핑 & 삭제 이펙트
   */
  useEffect(() => {
    const currentEntry = DOSSIER_TERMINAL_ENTRIES[entryIdx];
    const fullText = currentEntry.text;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < fullText.length) {
      // 타이핑 진행
      timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 38);
    } else if (!isDeleting && typedText.length === fullText.length) {
      // 문장 완성 후 가독 대기 (2.4초)
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && typedText.length > 0) {
      // 빠른 역순 삭제
      timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length - 1));
      }, 18);
    } else if (isDeleting && typedText.length === 0) {
      // 다음 이력/역량 항목으로 전환
      setIsDeleting(false);
      setEntryIdx((prev) => (prev + 1) % DOSSIER_TERMINAL_ENTRIES.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, entryIdx]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIdx((prev) => (prev + 1) % KINETIC_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  /**
   * 히어로 섹션 마우스 현재 위치 추적 핸들러
   * @param e
   * @returns
   */
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const currentBgItem =
    heroBgSlides[bgSlideIdx % Math.max(heroBgSlides.length, 1)];

  const currentTerminalCmd = DOSSIER_TERMINAL_ENTRIES[entryIdx].cmd;

  /**
   * 하단 히어로 섹션 마우스 추적 핸들러
   * @param e
   * @returns
   */
  const handleClosingMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = closingRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return {
    heroRef,
    closingRef,
    heroBgSlides,
    bgSlideIdx,
    currentBgItem,
    keywordIdx,
    isProjectsLoading,
    showcaseProjects,
    totalPublishedCount,
    currentTerminalCmd,
    typedText,
    terminalStepLabel: `${String(entryIdx + 1).padStart(2, "0")} / ${String(
      DOSSIER_TERMINAL_ENTRIES.length,
    ).padStart(2, "0")}`,
    processSteps,
    engineeringFAQs,
    openFaq,
    handleHeroMouseMove,
    handleClosingMouseMove,
    toggleFaq,
  };
}
