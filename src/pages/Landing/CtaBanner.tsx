// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import type { LandingTabData } from "./landingData";

interface CtaBannerProps {
  tabData: LandingTabData;
}

export function CtaBanner({ tabData }: CtaBannerProps) {
  return (
    <div className="w-300 rounded-2xl bg-primary-600 px-10 py-16 flex items-center justify-between relative overflow-hidden">
      {/* Left text */}
      <h2 className="text-3xl font-bold leading-[1.7] tracking-tight text-primary-50 whitespace-pre-line">
        {tabData.bannerTitle}
      </h2>

      {/* Right chat bubbles */}
      <div className="flex flex-col gap-3 shrink-0">
        {tabData.chatBubbles.map((bubble, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-5 py-4 rounded-tl-3xl rounded-tr-3xl shadow-md bg-primary-50 ${
              bubble.align === "right"
                ? "rounded-br-3xl self-end"
                : "rounded-bl-3xl self-start"
            }`}
          >
            <p className="text-lg font-medium leading-[1.4] tracking-tight text-primary-900">
              {bubble.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
