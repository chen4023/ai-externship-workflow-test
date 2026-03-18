// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1100&m=dev
// Figma-states: login
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (!isFormValid) return;
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[40px] w-[348px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            로그인
          </h1>

          <div className="flex flex-col gap-[16px] w-full">
            <Input
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={setEmail}
            />
            <PasswordInput
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={setPassword}
            />
          </div>

          <div className="flex flex-col gap-[16px] w-full">
            <Button
              disabled={!isFormValid}
              onClick={handleLogin}
              className="w-full"
            >
              로그인
            </Button>

            <div className="flex items-center justify-center gap-[12px] text-[14px] tracking-[-0.42px] text-[var(--color-gray-500)]">
              <button
                type="button"
                onClick={() => navigate("/login/find-id")}
                className="cursor-pointer hover:text-[var(--color-gray-700)] transition-colors"
              >
                아이디 찾기
              </button>
              <span className="text-[var(--color-gray-250)]">|</span>
              <button
                type="button"
                onClick={() => navigate("/login/find-password")}
                className="cursor-pointer hover:text-[var(--color-gray-700)] transition-colors"
              >
                비밀번호 찾기
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[16px] w-full">
            <p className="text-[14px] tracking-[-0.42px] text-[var(--color-gray-400)]">
              아직 계정이 없으신가요?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/signup")}
              className="w-full"
            >
              회원가입
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
