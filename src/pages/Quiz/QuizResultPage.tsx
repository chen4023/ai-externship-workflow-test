// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-4815&m=dev
// Figma-states: quiz
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Button } from "../../shared/ui/Button/Button";

interface ResultQuestion {
  id: number;
  question: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
}

const MOCK_RESULTS: ResultQuestion[] = [
  {
    id: 1,
    question: "React에서 상태(state)를 관리하기 위해 사용하는 훅은?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    selectedIndex: 1,
    correctIndex: 1,
  },
  {
    id: 2,
    question:
      "JSX에서 JavaScript 표현식을 삽입할 때 사용하는 기호는?",
    options: ["( )", "{ }", "[ ]", "< >"],
    selectedIndex: 2,
    correctIndex: 1,
  },
  {
    id: 3,
    question: "컴포넌트가 처음 렌더링될 때 실행되는 훅은?",
    options: ["useCallback", "useMemo", "useEffect", "useReducer"],
    selectedIndex: 2,
    correctIndex: 2,
  },
];

const CorrectIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" fill="var(--color-success)" />
    <path
      d="M6 10L9 13L14 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WrongIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" fill="var(--color-danger)" />
    <path
      d="M7 7L13 13M13 7L7 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function QuizResultPage() {
  useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const correctCount = MOCK_RESULTS.filter(
    (q) => q.selectedIndex === q.correctIndex,
  ).length;
  const totalCount = MOCK_RESULTS.length;
  const score = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[40px] w-[800px]">
          {/* Score summary */}
          <div className="flex flex-col items-center gap-[16px] py-[40px] rounded-[12px] border border-[var(--color-gray-200)] bg-[var(--color-gray-100)]">
            <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-600)]">
              시험 결과
            </p>
            <p className="text-[48px] font-bold leading-[1.2] tracking-[-1.44px] text-[var(--color-primary)]">
              {score}점
            </p>
            <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)]">
              {totalCount}문제 중 {correctCount}문제 정답
            </p>
          </div>

          {/* Results detail */}
          <div className="flex flex-col gap-[24px]">
            <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.6px] text-[var(--color-gray-primary)]">
              문제별 결과
            </h2>

            {MOCK_RESULTS.map((q, qIdx) => {
              const isCorrect = q.selectedIndex === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="flex flex-col gap-[16px] p-[24px] rounded-[8px] border border-[var(--color-gray-200)]"
                >
                  <div className="flex items-center gap-[8px]">
                    {isCorrect ? <CorrectIcon /> : <WrongIcon />}
                    <span className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
                      문제 {qIdx + 1}
                    </span>
                  </div>
                  <p className="text-[16px] font-semibold leading-[1.6] tracking-[-0.48px] text-[var(--color-gray-primary)]">
                    {q.question}
                  </p>
                  <div className="flex flex-col gap-[8px]">
                    {q.options.map((option, idx) => {
                      const isSelected = idx === q.selectedIndex;
                      const isAnswer = idx === q.correctIndex;
                      let borderClass =
                        "border-[var(--color-gray-200)]";
                      let bgClass = "bg-white";
                      if (isAnswer) {
                        borderClass =
                          "border-[var(--color-success)]";
                        bgClass = "bg-[var(--color-success)]/5";
                      } else if (isSelected && !isCorrect) {
                        borderClass = "border-[var(--color-danger)]";
                        bgClass = "bg-[var(--color-danger)]/5";
                      }
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-[12px] p-[12px] rounded-[8px] border ${borderClass} ${bgClass}`}
                        >
                          <span
                            className={`flex items-center justify-center w-[24px] h-[24px] rounded-full text-[12px] font-semibold shrink-0 ${
                              isAnswer
                                ? "bg-[var(--color-success)] text-white"
                                : isSelected && !isCorrect
                                  ? "bg-[var(--color-danger)] text-white"
                                  : "bg-[var(--color-gray-200)] text-[var(--color-gray-600)]"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span
                            className={`text-[14px] leading-[1.4] tracking-[-0.42px] ${
                              isAnswer
                                ? "text-[var(--color-success)] font-semibold"
                                : isSelected && !isCorrect
                                  ? "text-[var(--color-danger)]"
                                  : "text-[var(--color-gray-primary)]"
                            }`}
                          >
                            {option}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <Button onClick={() => navigate("/mypage/quiz")}>
              돌아가기
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
