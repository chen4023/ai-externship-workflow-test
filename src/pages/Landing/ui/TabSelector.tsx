// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import type { LandingTab } from '../lib/landingData';
import { LANDING_TABS } from '../lib/landingData';

interface TabSelectorProps {
  activeTab: LandingTab;
  onTabChange: (tab: LandingTab) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="서비스 기능 탭"
      className="flex items-center gap-2 p-3 rounded-full border border-gray-200 bg-white"
    >
      {LANDING_TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.key}`}
            id={`tab-${tab.key}`}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center justify-center px-5 py-5 rounded-full w-36 text-xl font-bold leading-snug tracking-tight cursor-pointer transition-colors ${
              isActive
                ? 'bg-primary text-primary-50'
                : 'text-gray-disabled hover:text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
