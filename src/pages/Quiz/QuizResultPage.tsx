// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-4815&m=dev
// Figma-states: quiz
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/Button/Button";
import { CorrectIcon } from "../../shared/ui/Icons/CorrectIcon";
import { WrongIcon } from "../../shared/ui/Icons/WrongIcon";

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

export function QuizResultPage() {
  const navigate = useNavigate();

  const correctCount = MOCK_RESULTS.filter(
    (q) => q.selectedIndex === q.correctIndex,
  ).length;
  const totalCount = MOCK_RESULTS.length;
  const score = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="flex flex-col gap-10 w-200">
      {/* Score summary */}
      <div className="flex flex-col items-center gap-4 py-10 rounded-xl border border-gray-200 bg-gray-100">
        <p className="text-base leading-snug tracking-tight text-gray-600">
          시험 결과
        </p>
        <p className="text-5xl font-bold leading-tight tracking-tight text-primary">
          {score}점
        </p>
        <p className="text-sm leading-snug tracking-tight text-gray-500">
          {totalCount}문제 중 {correctCount}문제 정답
        </p>
      </div>

      {/* Results detail */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-primary">
          문제별 결과
        </h2>

        {MOCK_RESULTS.map((q, qIdx) => {
          const isCorrect = q.selectedIndex === q.correctIndex;
          return (
            <div
              key={q.id}
              className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-2">
                {isCorrect ? <CorrectIcon /> : <WrongIcon />}
                <span className="text-sm font-semibold leading-snug tracking-tight text-gray-600">
                  문제 {qIdx + 1}
                </span>
              </div>
              <p className="text-base font-semibold leading-relaxed tracking-tight text-gray-primary">
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((option, idx) => {
                  const isSelected = idx === q.selectedIndex;
                  const isAnswer = idx === q.correctIndex;
                  let borderClass = "border-gray-200";
                  let bgClass = "bg-white";
                  if (isAnswer) {
                    borderClass = "border-success";
                    bgClass = "bg-success/5";
                  } else if (isSelected && !isCorrect) {
                    borderClass = "border-danger";
                    bgClass = "bg-danger/5";
                  }
                  return (
                    <div
                      key={`${q.id}-${idx}`}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${borderClass} ${bgClass}`}
                    >
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 ${
                          isAnswer
                            ? "bg-success text-white"
                            : isSelected && !isCorrect
                              ? "bg-danger text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`text-sm leading-snug tracking-tight ${
                          isAnswer
                            ? "text-success font-semibold"
                            : isSelected && !isCorrect
                              ? "text-danger"
                              : "text-gray-primary"
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
  );
}
