// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-3499&m=dev
// Figma-states: mypageQuiz
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { MypageSidebar } from "../../shared/ui/MypageSidebar/MypageSidebar";
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

const MOCK_QUIZZES: QuizItem[] = [
  {
    id: 1,
    title: "React 기초 쪽지시험",
    date: "2025-03-15",
    status: "completed",
    score: 80,
  },
  {
    id: 2,
    title: "TypeScript 심화 쪽지시험",
    date: "2025-03-18",
    status: "pending",
  },
];

export function MypageQuizPage() {
  const navigate = useNavigate();
  const [participationCode, setParticipationCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleJoinQuiz = (e: FormEvent) => {
    e.preventDefault();
    if (participationCode.trim().length === 0) return;
    setCodeError(false);
    // TODO: API 연동 - 참가코드 확인
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-15">
        <div className="flex gap-10 w-300">
          <MypageSidebar />

          {/* Content */}
          <section className="flex-1 flex flex-col gap-10">
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
              쪽지시험
            </h2>

            {/* Join quiz section */}
            <form
              onSubmit={handleJoinQuiz}
              className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200 bg-gray-100"
            >
              <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
                시험 보기
              </p>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label htmlFor="quiz-code" className="sr-only">참가 코드</label>
                  <Input
                    id="quiz-code"
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
                  type="submit"
                  size="sm"
                  disabled={participationCode.trim().length === 0}
                >
                  참여하기
                </Button>
              </div>
            </form>

            {/* Quiz list */}
            {MOCK_QUIZZES.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-20">
                <NotFound variant="quiz" />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
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
                    className="flex items-center justify-between p-5 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
                        {quiz.title}
                      </p>
                      <p className="text-sm leading-snug tracking-tight text-gray-400">
                        {quiz.date}
                      </p>
                    </div>
                    {quiz.status === "completed" ? (
                      <span className="text-sm font-semibold text-primary">
                        {quiz.score}점
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">
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
