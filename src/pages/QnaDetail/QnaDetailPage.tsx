// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081&m=dev
// Figma-states: qnaDetail
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
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
  const navigate = useNavigate();
  const [answerContent, setAnswerContent] = useState("");

  const handleSubmitAnswer = () => {
    if (answerContent.trim().length === 0) return;
    setAnswerContent("");
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[32px] w-[1200px]">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate("/qna")}
            className="flex items-center gap-[8px] text-[14px] tracking-[-0.42px] text-[var(--color-gray-500)] cursor-pointer hover:text-[var(--color-gray-700)] transition-colors w-fit"
          >
            ← 목록으로
          </button>

          {/* Question */}
          <article className="flex flex-col gap-[24px] pb-[32px] border-b border-[var(--color-gray-200)]">
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
                React useEffect 클린업 함수는 언제 실행되나요?
              </h1>
              <div className="flex items-center gap-[12px]">
                <ProfileImage size="sm" />
                <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
                  김수강
                </span>
                <span className="text-[12px] leading-[1.4] tracking-[-0.36px] text-[var(--color-gray-400)]">
                  2025-03-15
                </span>
              </div>
            </div>
            <p className="text-[16px] leading-[1.8] tracking-[-0.48px] text-[var(--color-gray-700)]">
              useEffect 안에서 return 하는 함수가 언제 호출되는지 정확히
              알고 싶습니다. 컴포넌트가 언마운트될 때만 실행되는 건가요,
              아니면 다른 시점에도 실행되나요? 예시 코드와 함께
              설명해주시면 감사하겠습니다.
            </p>
          </article>

          {/* Answers */}
          <section className="flex flex-col gap-[24px]">
            <h2 className="text-[18px] font-semibold leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)]">
              답변 {MOCK_ANSWERS.length}
            </h2>

            {MOCK_ANSWERS.map((answer) => (
              <div
                key={answer.id}
                className="flex flex-col gap-[16px] p-[24px] rounded-[8px] border border-[var(--color-gray-200)] bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[12px]">
                    <ProfileImage size="sm" />
                    <span className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-primary)]">
                      {answer.author}
                    </span>
                    <span className="text-[12px] leading-[1.4] tracking-[-0.36px] text-[var(--color-gray-400)]">
                      {answer.date}
                    </span>
                  </div>
                  {answer.isAdopted && (
                    <span className="text-[14px] font-semibold text-[var(--color-success)]">
                      채택됨
                    </span>
                  )}
                </div>
                <p className="text-[16px] leading-[1.8] tracking-[-0.48px] text-[var(--color-gray-700)]">
                  {answer.content}
                </p>
                <div className="flex items-center gap-[8px]">
                  <Button variant="ghost" size="sm">
                    채택하기
                  </Button>
                </div>
              </div>
            ))}
          </section>

          {/* Answer input */}
          <section className="flex flex-col gap-[12px] pt-[24px] border-t border-[var(--color-gray-200)]">
            <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)]">
              답변 작성
            </p>
            <CommentInput
              placeholder="답변을 입력해 주세요."
              value={answerContent}
              onChange={setAnswerContent}
            />
            <div className="flex justify-end">
              <CommentSubmitButton
                label="답변 등록"
                disabled={answerContent.trim().length === 0}
                onClick={handleSubmitAnswer}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
