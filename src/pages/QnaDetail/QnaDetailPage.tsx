// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081&m=dev
// Figma-states: qnaDetail
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../shared/ui/Button/Button";
import { CommentInput } from "../../shared/ui/CommentInput/CommentInput";
import { CommentSubmitButton } from "../../shared/ui/CommentSubmitButton/CommentSubmitButton";
import { ProfileImage } from "../../shared/ui/ProfileImage/ProfileImage";

interface Answer {
  id: number;
  author: string;
  content: string;
  date: string;
  isAdopted: boolean;
}

const MOCK_ANSWERS: Answer[] = [
  {
    id: 1,
    author: "멘토김",
    content:
      "useEffect의 클린업 함수는 두 가지 시점에 실행됩니다. 첫째, 컴포넌트가 언마운트될 때. 둘째, 의존성 배열의 값이 변경되어 Effect가 다시 실행되기 직전에 이전 Effect의 클린업이 먼저 실행됩니다.",
    date: "2025-03-15",
    isAdopted: false,
  },
];

export function QnaDetailPage() {
  const [answerContent, setAnswerContent] = useState("");

  const handleSubmitAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (answerContent.trim().length === 0) return;
    setAnswerContent("");
    // TODO: API 연동
  };

  return (
    <div className="flex flex-col gap-8 w-300">
      {/* Back link */}
      <Link
        to="/qna"
        className="flex items-center gap-2 text-sm tracking-tight text-gray-500 hover:text-gray-700 transition-colors w-fit"
      >
        &larr; 목록으로
      </Link>

      {/* Question */}
      <article className="flex flex-col gap-6 pb-8 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            React useEffect 클린업 함수는 언제 실행되나요?
          </h1>
          <div className="flex items-center gap-3">
            <ProfileImage size="sm" />
            <span className="text-sm leading-snug tracking-tight text-gray-600">
              김수강
            </span>
            <span className="text-xs leading-snug tracking-tight text-gray-400">
              2025-03-15
            </span>
          </div>
        </div>
        <p className="text-base leading-relaxed tracking-tight text-gray-700">
          useEffect 안에서 return 하는 함수가 언제 호출되는지 정확히
          알고 싶습니다. 컴포넌트가 언마운트될 때만 실행되는 건가요,
          아니면 다른 시점에도 실행되나요? 예시 코드와 함께
          설명해주시면 감사하겠습니다.
        </p>
      </article>

      {/* Answers */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-gray-primary">
          답변 {MOCK_ANSWERS.length}
        </h2>

        {MOCK_ANSWERS.map((answer) => (
          <div
            key={answer.id}
            className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200 bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProfileImage size="sm" />
                <span className="text-sm font-semibold leading-snug tracking-tight text-gray-primary">
                  {answer.author}
                </span>
                <span className="text-xs leading-snug tracking-tight text-gray-400">
                  {answer.date}
                </span>
              </div>
              {answer.isAdopted && (
                <span className="text-sm font-semibold text-success">
                  채택됨
                </span>
              )}
            </div>
            <p className="text-base leading-relaxed tracking-tight text-gray-700">
              {answer.content}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                채택하기
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Answer input */}
      <form onSubmit={handleSubmitAnswer} className="flex flex-col gap-3 pt-6 border-t border-gray-200">
        <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
          답변 작성
        </p>
        <CommentInput
          placeholder="답변을 입력해 주세요."
          value={answerContent}
          onChange={setAnswerContent}
        />
        <div className="flex justify-end">
          <CommentSubmitButton
            type="submit"
            label="답변 등록"
            disabled={answerContent.trim().length === 0}
          />
        </div>
      </form>
    </div>
  );
}
