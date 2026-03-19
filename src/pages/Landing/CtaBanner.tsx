// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import { useNavigate } from 'react-router-dom';
import type { LandingTabData } from './landingData';

interface CtaBannerProps {
  tabData: LandingTabData;
}

export function CtaBanner({ tabData }: CtaBannerProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(tabData.ctaLink);
  };

  return (
    <div className="w-300 rounded-2xl bg-primary-600 px-10 py-16 flex items-center justify-between">
      <h2 className="text-3xl font-bold leading-relaxed tracking-tight text-primary-50 whitespace-pre-line">
        {tabData.bannerTitle}
      </h2>
      <button
        type="button"
        onClick={handleClick}
        className="shrink-0 px-8 py-4 rounded-lg border-2 border-primary-50 text-primary-50 text-lg font-bold leading-snug tracking-tight cursor-pointer transition-colors hover:bg-primary-50 hover:text-primary-600"
      >
        시작하기
      </button>
    </div>
  );
}
