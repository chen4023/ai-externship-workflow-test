// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import { useState } from 'react';
import type { LandingTab, LandingTabData } from './landingData';
import { getTabData } from './landingData';

interface UseLandingTabReturn {
  activeTab: LandingTab;
  setActiveTab: (tab: LandingTab) => void;
  tabData: LandingTabData;
}

export function useLandingTab(initialTab: LandingTab = 'quiz'): UseLandingTabReturn {
  const [activeTab, setActiveTab] = useState<LandingTab>(initialTab);
  const tabData = getTabData(activeTab);

  return {
    activeTab,
    setActiveTab,
    tabData,
  };
}
