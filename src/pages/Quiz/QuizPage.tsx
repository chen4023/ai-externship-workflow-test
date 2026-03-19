// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-3969&m=dev
// Figma-states: quiz
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    <>
      <div className="flex flex-col gap-8 w-200">
        {/* Quiz header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
              쪽지시험
            </h1>
            <span className="text-sm leading-snug tracking-tight text-gray-500">
              {answeredCount} / {totalCount}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${(answeredCount / totalCount) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold leading-snug tracking-tight text-primary">
              문제 {currentIndex + 1}
            </span>
            <p className="text-lg font-semibold leading-relaxed tracking-tight text-gray-primary">
              {current.question}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {current.options.map((option, idx) => {
              const isSelected = answers[current.id] === idx;
              return (
                <button
                  key={`${current.id}-${idx}`}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`flex items-center gap-3 w-full p-4 rounded-lg border text-left cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary-50"
                      : "border-gray-200 bg-white hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold shrink-0 ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`text-base leading-snug tracking-tight ${
                      isSelected
                        ? "text-primary font-semibold"
                        : "text-gray-primary"
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
        <div className="flex items-center justify-between pt-4">
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

      <ConfirmModal
        open={showSubmitModal}
        message="시험을 제출하시겠습니까? 제출 후에는 수정할 수 없습니다."
        confirmLabel="제출"
        cancelLabel="취소"
        onConfirm={handleSubmit}
        onCancel={() => setShowSubmitModal(false)}
      />
    </>
  );
}
