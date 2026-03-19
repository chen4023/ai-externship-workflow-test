// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1444&m=dev
// Figma-states: login
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";

export function FindPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const isFormValid = email.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSent(true);
    // TODO: API 연동 - 이메일 인증 요청
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 w-87">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            비밀번호 찾기
          </h1>

          {sent ? (
            <div className="flex flex-col items-center gap-10 w-full">
              <div className="flex flex-col items-center gap-4">
                <p className="text-base leading-relaxed tracking-tight text-gray-600 text-center">
                  입력하신 이메일로 비밀번호 재설정 링크를
                  <br />
                  발송했습니다.
                </p>
                <p className="text-sm leading-snug tracking-tight text-gray-400 text-center">
                  이메일을 확인해 주세요.
                </p>
              </div>
              <Button
                onClick={() => navigate("/login")}
                className="w-full"
              >
                로그인으로 돌아가기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm leading-snug tracking-tight text-gray-600">
                  가입 시 등록한 이메일을 입력하시면 비밀번호 재설정
                  링크를 보내드립니다.
                </p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="find-pw-email" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    이메일
                  </label>
                  <Input
                    id="find-pw-email"
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={setEmail}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full"
                >
                  인증 메일 발송
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm tracking-tight text-gray-500 text-center cursor-pointer hover:text-gray-700 transition-colors"
                >
                  로그인으로 돌아가기
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
