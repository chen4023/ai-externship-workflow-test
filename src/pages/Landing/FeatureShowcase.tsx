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

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${activeTab}`}
      aria-labelledby={`tab-${activeTab}`}
      className="relative w-300"
    >
      <div className="flex items-start justify-center">
        {/* Left feature card */}
        <div className="flex flex-col pt-36 w-56 shrink-0">
          {leftCard && <FeatureCard card={leftCard} />}
        </div>

        {/* Main screenshot frame */}
        <div className="flex-1 flex justify-center">
          <div className="w-225 h-131 rounded-3xl border-6 border-primary-900 bg-white shadow-lg overflow-hidden">
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              {tabData.label} 미리보기
            </div>
          </div>
        </div>

        {/* Right feature card */}
        <div className="flex flex-col w-56 shrink-0">
          {rightCard && <FeatureCard card={rightCard} />}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ card }: { card: FeatureCardType }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-5 rounded-xl border-2 border-primary-300 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-300 border border-primary-400">
          <span className="text-white text-xs">&#9998;</span>
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
