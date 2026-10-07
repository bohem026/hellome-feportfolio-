import { CAREER_HISTORY, TECH_CRAFTS } from '@/constants';
import { CareerItem, TechCraftItem } from '@/types';

export function useAboutPage() {
  const careerHistory: CareerItem[] = CAREER_HISTORY;
  const techCrafts: TechCraftItem[] = TECH_CRAFTS;

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert('이메일 주소가 복사되었습니다.');
  };

  return {
    careerHistory,
    techCrafts,
    handleCopyEmail,
  };
}