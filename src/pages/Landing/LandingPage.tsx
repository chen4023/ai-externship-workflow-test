// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import { HeroSection } from './ui/HeroSection';
import { TabSelector } from './ui/TabSelector';
import { FeatureShowcase } from './ui/FeatureShowcase';
import { CtaBanner } from './ui/CtaBanner';
import { useLandingTab } from './model/useLandingTab';

export function LandingPage() {
  const { activeTab, setActiveTab, tabData } = useLandingTab('quiz');

  return (
    <div className="bg-gray-100 -mx-4 px-4">
      {/* Hero + Tab */}
      <section className="flex flex-col items-center pt-32 pb-10 gap-10">
        <HeroSection tabData={tabData} />
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      </section>

      {/* Feature showcase */}
      <section className="flex justify-center pb-20">
        <FeatureShowcase activeTab={activeTab} tabData={tabData} />
      </section>

      {/* CTA Banner */}
      <section className="flex justify-center pb-20">
        <CtaBanner tabData={tabData} />
      </section>
    </div>
  );
}
