// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014&m=dev
// Figma-states: landing
import { useState } from "react";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";

type LandingTab = "quiz" | "qna" | "community";

const TABS: { key: LandingTab; label: string }[] = [
  { key: "quiz", label: "쪽지시험" },
  { key: "qna", label: "질의응답" },
  { key: "community", label: "커뮤니티" },
];

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<LandingTab>("quiz");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header variant="guest" />

      {/* Hero */}
      <section className="flex flex-col items-center pt-32 pb-10">
        <h1 className="text-5xl font-bold leading-normal tracking-tight text-gray-primary text-center whitespace-pre-line">
          {"쪽지시험으로\n실력을 차곡차곡 쌓아보세요"}
        </h1>

        {/* Pill tabs */}
        <div className="flex items-center gap-2 mt-10 p-3 rounded-full border border-gray-200 bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center px-5 py-5 rounded-full w-36 text-xl font-bold leading-snug tracking-tight cursor-pointer transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-50"
                  : "text-gray-disabled"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Feature showcase */}
      <section className="flex justify-center pb-20">
        <div className="relative w-300">
          {/* Placeholder for screenshots */}
          <div className="flex justify-center">
            <div className="w-225 h-131 rounded-3xl border-6 border-primary-900 bg-white shadow-lg" />
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="flex justify-center pb-20">
        <div className="w-300 rounded-2xl bg-primary-600 px-10 py-16">
          <h2 className="text-3xl font-bold leading-relaxed tracking-tight text-primary-50 whitespace-pre-line">
            {"함께 묻고 답하며,\n현직자의 피드백으로 빠르게 성장할 수 있어요"}
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
}
