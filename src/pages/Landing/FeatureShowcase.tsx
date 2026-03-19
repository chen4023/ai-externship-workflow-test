// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

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
      className="relative w-300 h-160"
    >
      {/* Left feature card */}
      {leftCard && (
        <div className="absolute left-0 top-36 z-10">
          <FeatureCard card={leftCard} />
        </div>
      )}

      {/* Main screenshot frame - Figma: 902x524, border-6 primary-900, rounded-3xl */}
      <div className="absolute left-1/2 -translate-x-1/2 top-12 w-225 h-131 rounded-3xl border-6 border-primary-900 shadow-lg overflow-hidden">
        <img
          src={images.main}
          alt={`${tabData.label} 미리보기`}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Overlay image (bottom center of main frame) */}
      <img
        src={images.overlay}
        alt=""
        className="absolute left-1/2 -translate-x-1/4 top-42 z-10 h-18 w-auto"
      />

      {/* Side screenshot - Figma: right side, smaller, rounded-xl, border gray-250 */}
      <div className="absolute right-0 top-26 w-75 h-96 rounded-xl border border-gray-250 overflow-hidden shadow-sm">
        <img
          src={images.side}
          alt={`${tabData.label} 상세 미리보기`}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Right feature card */}
      {rightCard && (
        <div className="absolute right-3 top-0 z-10">
          <FeatureCard card={rightCard} />
        </div>
      )}

      {/* Illustration (quiz tab bottom) */}
      {activeTab === "quiz" && (
        <img
          src="/images/landing/quiz-illustration.png"
          alt=""
          className="absolute left-1/2 -translate-x-1/4 bottom-0 h-56 w-auto"
        />
      )}
    </div>
  );
}

function FeatureCard({ card }: { card: FeatureCardType }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-5 rounded-xl border-2 border-primary-300 shadow-sm backdrop-blur-2xl">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-300 border border-primary-400 text-sm text-gray-100">
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
