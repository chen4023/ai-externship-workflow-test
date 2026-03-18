// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-3499&m=dev
// Figma-states: mypageQuiz
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { SidebarButton } from "../../shared/ui/SidebarButton/SidebarButton";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";
import { NotFound } from "../../shared/ui/NotFound/NotFound";

interface QuizItem {
  id: number;
  title: string;
  date: string;
  status: "pending" | "completed";
  score?: number;
}

const MOCK_QUIZZES: QuizItem[] = [];

export function MypageQuizPage() {
  const navigate = useNavigate();
  const [participationCode, setParticipationCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleJoinQuiz = () => {
    if (participationCode.trim().length === 0) return;
    setCodeError(false);
    // TODO: API 연동 - 참가코드 확인
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[60px]">
        <div className="flex gap-[40px] w-[1200px]">
          {/* Sidebar */}
          <aside className="flex flex-col gap-[8px] w-[200px] shrink-0">
            <SidebarButton onClick={() => navigate("/mypage")}>
              프로필
            </SidebarButton>
            <SidebarButton onClick={() => navigate("/mypage/password")}>
              비밀번호 변경
            </SidebarButton>
            <SidebarButton active>쪽지시험</SidebarButton>
          </aside>

          {/* Content */}
          <section className="flex-1 flex flex-col gap-[40px]">
            <h2 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
              쪽지시험
            </h2>

            {/* Join quiz section */}
            <div className="flex flex-col gap-[16px] p-[24px] rounded-[8px] border border-[var(--color-gray-200)] bg-[var(--color-gray-100)]">
              <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)]">
                시험 보기
              </p>
              <div className="flex items-end gap-[12px]">
                <div className="flex-1">
                  <Input
                    placeholder="참가 코드를 입력해 주세요."
                    value={participationCode}
                    onChange={(v) => {
                      setParticipationCode(v);
                      setCodeError(false);
                    }}
                    state={codeError ? "danger" : undefined}
                    dangerText={
                      codeError
                        ? "참가 코드가 일치하지 않습니다."
                        : undefined
                    }
                  />
                </div>
                <Button
                  size="sm"
                  disabled={participationCode.trim().length === 0}
                  onClick={handleJoinQuiz}
                >
                  참여하기
                </Button>
              </div>
            </div>

            {/* Quiz list */}
            {MOCK_QUIZZES.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-[80px]">
                <NotFound variant="quiz" />
              </div>
            ) : (
              <div className="flex flex-col gap-[12px]">
                {MOCK_QUIZZES.map((quiz) => (
                  <button
                    key={quiz.id}
                    type="button"
                    onClick={() =>
                      navigate(
                        quiz.status === "completed"
                          ? `/quiz/${quiz.id}/result`
                          : `/quiz/${quiz.id}`,
                      )
                    }
                    className="flex items-center justify-between p-[20px] rounded-[8px] border border-[var(--color-gray-200)] bg-white cursor-pointer hover:bg-[var(--color-gray-100)] transition-colors"
                  >
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)]">
                        {quiz.title}
                      </p>
                      <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-400)]">
                        {quiz.date}
                      </p>
                    </div>
                    {quiz.status === "completed" ? (
                      <span className="text-[14px] font-semibold text-[var(--color-primary)]">
                        {quiz.score}점
                      </span>
                    ) : (
                      <span className="text-[14px] text-[var(--color-gray-400)]">
                        미응시
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
