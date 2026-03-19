// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import { Header } from '../../shared/ui/Header/Header';
import { Footer } from '../../shared/ui/Footer/Footer';
import { HeroSection } from './HeroSection';
import { TabSelector } from './TabSelector';
import { FeatureShowcase } from './FeatureShowcase';
import { CtaBanner } from './CtaBanner';
import { useLandingTab } from './useLandingTab';

export function LandingPage() {
  const { activeTab, setActiveTab, tabData } = useLandingTab('quiz');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header variant="guest" />

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

      <Footer />
    </div>
  );
}
