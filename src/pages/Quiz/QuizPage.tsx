// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-3969&m=dev
// Figma-states: quiz
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Button } from "../../shared/ui/Button/Button";
import { ConfirmModal } from "../../shared/ui/Modal/Modal";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "React에서 상태(state)를 관리하기 위해 사용하는 훅은?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
  },
  {
    id: 2,
    question: "JSX에서 JavaScript 표현식을 삽입할 때 사용하는 기호는?",
    options: ["( )", "{ }", "[ ]", "< >"],
  },
  {
    id: 3,
    question: "컴포넌트가 처음 렌더링될 때 실행되는 훅은?",
    options: ["useCallback", "useMemo", "useEffect", "useReducer"],
  },
];

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const current = MOCK_QUESTIONS[currentIndex] as QuizQuestion;
  const totalCount = MOCK_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === totalCount;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }));
  };

  const handleSubmit = () => {
    setShowSubmitModal(false);
    navigate(`/quiz/${quizId}/result`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[32px] w-[800px]">
          {/* Quiz header */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
                쪽지시험
              </h1>
              <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)]">
                {answeredCount} / {totalCount}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-[4px] rounded-full bg-[var(--color-gray-200)]">
              <div
                className="h-full rounded-full bg-[var(--color-primary)] transition-all"
                style={{
                  width: `${(answeredCount / totalCount) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[12px]">
              <span className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-primary)]">
                문제 {currentIndex + 1}
              </span>
              <p className="text-[18px] font-semibold leading-[1.6] tracking-[-0.54px] text-[var(--color-gray-primary)]">
                {current.question}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-[12px]">
              {current.options.map((option, idx) => {
                const isSelected = answers[current.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`flex items-center gap-[12px] w-full p-[16px] rounded-[8px] border text-left cursor-pointer transition-colors ${
                      isSelected
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-50)]"
                        : "border-[var(--color-gray-200)] bg-white hover:bg-[var(--color-gray-100)]"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-[28px] h-[28px] rounded-full text-[14px] font-semibold shrink-0 ${
                        isSelected
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-[var(--color-gray-200)] text-[var(--color-gray-600)]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-[16px] leading-[1.4] tracking-[-0.48px] ${
                        isSelected
                          ? "text-[var(--color-primary)] font-semibold"
                          : "text-[var(--color-gray-primary)]"
                      }`}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-[16px]">
            <Button
              variant="ghost"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
            >
              이전
            </Button>
            {currentIndex < totalCount - 1 ? (
              <Button
                onClick={() => setCurrentIndex((p) => p + 1)}
              >
                다음
              </Button>
            ) : (
              <Button
                disabled={!isAllAnswered}
                onClick={() => setShowSubmitModal(true)}
              >
                제출하기
              </Button>
            )}
          </div>
        </div>
      </main>

      <ConfirmModal
        open={showSubmitModal}
        message="시험을 제출하시겠습니까? 제출 후에는 수정할 수 없습니다."
        confirmLabel="제출"
        cancelLabel="취소"
        onConfirm={handleSubmit}
        onCancel={() => setShowSubmitModal(false)}
      />
    </div>
  );
}
