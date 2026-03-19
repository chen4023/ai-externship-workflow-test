// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing
//
// Figma 절대좌표 기준 (1920px canvas, content 360~1560 = 1200px)
// 우측카드: x=973, y=0  | 메인프레임: x=149, y=54, 902x524
// 사이드: x=900, y=162, 300x440 | 좌측카드: x=0, y=198
// 오버레이: x=315, y=220, 515x72 | 일러스트: x=468, y=300, 362x226

import type { LandingTab, LandingTabData, FeatureCard as FeatureCardType } from "./landingData";

interface FeatureShowcaseProps {
  activeTab: LandingTab;
  tabData: LandingTabData;
}

export function FeatureShowcase({ activeTab, tabData }: FeatureShowcaseProps) {
  const leftCard = tabData.featureCards.find((c) => c.position === "left");
  const rightCard = tabData.featureCards.find((c) => c.position === "right");
  const { images } = tabData;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${activeTab}`}
      aria-labelledby={`tab-${activeTab}`}
      className="relative mx-auto"
      style={{ width: 1200, height: 602 }}
    >
      {/* 우측 상단 카드 — Figma: x=973, y=0 */}
      {rightCard && (
        <div className="absolute z-10" style={{ left: 973, top: 0 }}>
          <FeatureCard card={rightCard} />
        </div>
      )}

      {/* 메인 스크린샷 — Figma: centered x=149, y=54, 902x524 */}
      <div
        className="absolute rounded-3xl border-6 border-primary-900 overflow-hidden"
        style={{ left: 149, top: 54, width: 902, height: 524 }}
        data-shadow="main-frame"
      >
        <img
          src={images.main}
          alt={`${tabData.label} 미리보기`}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* 오버레이 프레임 — Figma: x=315, y=220, 515x72 */}
      <img
        src={images.overlay}
        alt=""
        className="absolute z-10 pointer-events-none"
        style={{ left: 315, top: 220, width: 515, height: 72 }}
      />

      {/* 사이드 스크린샷 — Figma: x=900, y=162, 300x440 */}
      <div
        className="absolute rounded-xl border border-gray-250 overflow-hidden"
        style={{ left: 900, top: 162, width: 300, height: 440 }}
      >
        <img
          src={images.side}
          alt={`${tabData.label} 상세`}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* 좌측 카드 — Figma: x=0, y=198 */}
      {leftCard && (
        <div className="absolute z-10" style={{ left: 0, top: 198 }}>
          <FeatureCard card={leftCard} />
        </div>
      )}

      {/* 일러스트 (quiz탭 전용) — Figma: x=468, y=300, 362x226 */}
      {activeTab === "quiz" && (
        <img
          src="/images/landing/quiz-illustration.png"
          alt=""
          className="absolute pointer-events-none"
          style={{ left: 468, top: 300, width: 362, height: 226 }}
        />
      )}
    </div>
  );
}

function FeatureCard({ card }: { card: FeatureCardType }) {
  return (
    <div
      className="flex flex-col gap-4 px-6 py-5 rounded-xl border-2 border-primary-300 backdrop-blur-2xl shadow-md"
    >
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center rounded-full bg-primary-300 border border-primary-400 text-sm text-gray-100"
          style={{ width: 28, height: 28 }}
        >
          {card.iconLabel}
        </div>
        <p className="text-lg font-bold leading-[1.4] tracking-tight text-primary-400">
          {card.title}
        </p>
      </div>
      <p className="text-base font-medium leading-[1.5] tracking-tight text-gray-600 whitespace-pre-line">
        {card.description}
      </p>
    </div>
  );
}
