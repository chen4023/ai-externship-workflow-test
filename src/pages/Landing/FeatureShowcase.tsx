// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import type { LandingTab, LandingTabData } from './landingData';

interface FeatureShowcaseProps {
  activeTab: LandingTab;
  tabData: LandingTabData;
}

export function FeatureShowcase({ activeTab, tabData }: FeatureShowcaseProps) {
  const [firstCard, secondCard, thirdCard] = tabData.featureCards;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${activeTab}`}
      aria-labelledby={`tab-${activeTab}`}
      className="relative w-300"
    >
      <div className="flex items-start gap-6">
        {/* Left feature card */}
        <div className="flex flex-col gap-6 pt-20 w-56 shrink-0">
          {firstCard && (
            <FeatureCard
              title={firstCard.title}
              description={firstCard.description}
            />
          )}
        </div>

        {/* Main screenshot frame */}
        <div className="flex-1 flex justify-center">
          <div className="w-168 h-100 rounded-3xl border-4 border-primary-900 bg-white shadow-lg overflow-hidden">
            <div className="flex items-center justify-center h-full text-gray-400 text-lg">
              {tabData.label} 미리보기
            </div>
          </div>
        </div>

        {/* Right feature cards */}
        <div className="flex flex-col gap-6 pt-10 w-56 shrink-0">
          {secondCard && (
            <FeatureCard
              title={secondCard.title}
              description={secondCard.description}
            />
          )}
          {thirdCard && (
            <FeatureCard
              title={thirdCard.title}
              description={thirdCard.description}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-primary leading-snug tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed tracking-tight">
        {description}
      </p>
    </div>
  );
}
