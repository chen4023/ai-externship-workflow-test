// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-12014&m=dev
// Figma-states: landing
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { CategoryTab, CategoryTabBar } from "../../shared/ui/CategoryTab/CategoryTab";
import { QuestionCard } from "../../shared/ui/QuestionCard/QuestionCard";
import { Button } from "../../shared/ui/Button/Button";

type LandingTab = "quiz" | "qna" | "community";

const MOCK_QUESTIONS = [
  {
    id: 1,
    title: "React useEffect 클린업 함수는 언제 실행되나요?",
    content: "useEffect 안에서 return 하는 함수가 언제 호출되는지 정확히 알고 싶습니다.",
    author: "김수강",
    date: "2025-03-15",
    answerCount: 3,
  },
  {
    id: 2,
    title: "TypeScript에서 제네릭은 어떤 경우에 사용하나요?",
    content: "제네릭의 실무 활용 사례가 궁금합니다. 간단한 예시도 부탁드립니다.",
    author: "이학생",
    date: "2025-03-14",
    answerCount: 5,
  },
  {
    id: 3,
    title: "CSS Grid와 Flexbox 중 어떤 것을 사용해야 하나요?",
    content: "레이아웃을 잡을 때 Grid와 Flexbox를 언제 사용하는지 기준이 궁금합니다.",
    author: "박개발",
    date: "2025-03-13",
    answerCount: 2,
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<LandingTab>("quiz");

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex items-center justify-center bg-[var(--color-primary-50)] py-[80px]">
          <div className="flex flex-col items-center gap-[32px] w-[1200px]">
            <div className="flex flex-col items-center gap-[16px]">
              <h1 className="text-[40px] font-bold leading-[1.3] tracking-[-1.2px] text-[var(--color-gray-primary)] text-center">
                함께 성장하는 학습 커뮤니티
              </h1>
              <p className="text-[18px] leading-[1.6] tracking-[-0.54px] text-[var(--color-gray-600)] text-center">
                쪽지시험으로 실력을 점검하고, 질의응답으로 함께 배워보세요.
              </p>
            </div>
            <Button onClick={() => navigate("/signup")}>
              시작하기
            </Button>
          </div>
        </section>

        {/* Content Section */}
        <section className="flex justify-center py-[60px]">
          <div className="flex flex-col gap-[32px] w-[1200px]">
            <CategoryTabBar>
              <CategoryTab
                label="쪽지시험"
                active={activeTab === "quiz"}
                onClick={() => setActiveTab("quiz")}
              />
              <CategoryTab
                label="질의응답"
                active={activeTab === "qna"}
                onClick={() => setActiveTab("qna")}
              />
              <CategoryTab
                label="커뮤니티"
                active={activeTab === "community"}
                onClick={() => setActiveTab("community")}
              />
            </CategoryTabBar>

            {activeTab === "quiz" && (
              <div className="flex flex-col items-center gap-[24px]">
                <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-600)]">
                  로그인 후 쪽지시험에 응시할 수 있습니다.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  로그인하고 시험 보기
                </Button>
              </div>
            )}

            {activeTab === "qna" && (
              <div className="flex flex-col gap-[16px]">
                {MOCK_QUESTIONS.map((q) => (
                  <QuestionCard
                    key={q.id}
                    title={q.title}
                    content={q.content}
                    author={q.author}
                    date={q.date}
                    answerCount={q.answerCount}
                    onClick={() => navigate(`/qna/${q.id}`)}
                  />
                ))}
                <div className="flex justify-center pt-[16px]">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/qna")}
                  >
                    더 보기
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "community" && (
              <div className="flex flex-col items-center gap-[24px]">
                <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-600)]">
                  커뮤니티에서 다양한 이야기를 나눠보세요.
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/community")}
                >
                  커뮤니티 둘러보기
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
