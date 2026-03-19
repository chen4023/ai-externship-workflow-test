// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014
// Figma-states: landing

import type { LandingTabData } from "../lib/landingData";

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

      {/* Right chat bubbles with avatars */}
      <div className="flex flex-col gap-3 shrink-0">
        {tabData.chatBubbles.map((bubble, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 ${
              bubble.align === "right" ? "self-end" : "self-start"
            }`}
          >
            {bubble.align === "left" && (
              <img
                src="/images/landing/banner-avatar2.png"
                alt=""
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            )}
            <div
              className={`px-5 py-5 bg-primary-50 shadow-md ${
                bubble.align === "right"
                  ? "rounded-tl-3xl rounded-tr-3xl rounded-br-3xl"
                  : "rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl"
              }`}
            >
              <p className="text-lg font-medium leading-[1.4] tracking-tight text-primary-900">
                {bubble.text}
              </p>
            </div>
            {bubble.align === "right" && (
              <img
                src="/images/landing/banner-avatar1.png"
                alt=""
                className="w-13 h-13 object-contain shrink-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
