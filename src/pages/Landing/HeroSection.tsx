// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import type { LandingTabData } from "./landingData";

interface HeroSectionProps {
  tabData: LandingTabData;
}

export function HeroSection({ tabData }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold leading-[1.5] tracking-tight text-gray-primary text-center whitespace-pre-line">
        {tabData.heroLines.join("\n")}
      </h1>
    </div>
  );
}
