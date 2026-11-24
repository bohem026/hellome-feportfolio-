"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { useProjects } from "../common/useProjects";
import {
  FEATURED_WORKS,
  PROCESS_STEPS,
  FAQS,
  KINETIC_KEYWORDS,
} from "@/constants";
import { WorkItem, ProcessItem, FAQItem } from "@/types";

export function useMainPage() {
  const { projects } = useProjects();
  const featuredWorks = FEATURED_WORKS as WorkItem[];
  const processSteps = PROCESS_STEPS as ProcessItem[];
  const faqs = FAQS as FAQItem[];

  // 1. 제자리 회전 헤드라인 인덱스
  const [keywordIdx, setKeywordIdx] = useState(0);
  // 2. 배경 썸네일 슬라이드 인덱스
  const [bgSlideIdx, setBgSlideIdx] = useState(0);
  // 3. 마우스 스포트라이트 그리드 좌표
  const heroRef = useRef<HTMLElement | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  /**
   * PUBLISHED 프로젝트 썸네일 목록 추출
   */
  const heroBgSlides = useMemo(() => {
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

    return featuredWorks.map((w) => ({
      id: w.id,
      title: w.title,
      imageUrl: w.imageUrl,
    }));
  }, [projects, featuredWorks]);

  /**
   * 헤드라인 회전 타이머 (2.8초)
   */
  const handleHeadlineRotate = useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIdx((prev) => (prev + 1) % KINETIC_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  /**
   * 배경 썸네일 크로스페이드 슬라이드 타이머 (4.5초)
   */
  const handleThumbnailSlideCrossfade = useEffect(() => {
    if (heroBgSlides.length <= 1) return;
    const slideInterval = setInterval(() => {
      setBgSlideIdx((prev) => (prev + 1) % heroBgSlides.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [heroBgSlides.length]);

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

  return {
    heroRef,
    heroBgSlides,
    bgSlideIdx,
    keywordIdx,
    featuredWorks,
    processSteps,
    faqs,
    openFaq,
    handleHeroMouseMove,
    toggleFaq,
  };
}
