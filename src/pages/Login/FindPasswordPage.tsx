// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1444&m=dev
// Figma-states: login
import { useState } from "react";
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

  const handleSubmit = () => {
    if (!isFormValid) return;
    setSent(true);
    // TODO: API 연동 - 이메일 인증 요청
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[40px] w-[348px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            비밀번호 찾기
          </h1>

          {sent ? (
            <div className="flex flex-col items-center gap-[40px] w-full">
              <div className="flex flex-col items-center gap-[16px]">
                <p className="text-[16px] leading-[1.6] tracking-[-0.48px] text-[var(--color-gray-600)] text-center">
                  입력하신 이메일로 비밀번호 재설정 링크를
                  <br />
                  발송했습니다.
                </p>
                <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-400)] text-center">
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
            <>
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
                  가입 시 등록한 이메일을 입력하시면 비밀번호 재설정
                  링크를 보내드립니다.
                </p>
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                    이메일
                  </label>
                  <Input
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={setEmail}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[16px] w-full">
                <Button
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                  className="w-full"
                >
                  인증 메일 발송
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[14px] tracking-[-0.42px] text-[var(--color-gray-500)] text-center cursor-pointer hover:text-[var(--color-gray-700)] transition-colors"
                >
                  로그인으로 돌아가기
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
