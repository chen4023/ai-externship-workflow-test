// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1992&m=dev
// Figma-states: signup
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Button } from "../../shared/ui/Button/Button";

export function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const passwordValid = password.length >= 6 && password.length <= 15;
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    passwordValid &&
    passwordsMatch &&
    agreed;

  const handleSignup = () => {
    if (!isFormValid) return;
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center py-[60px]">
        <div className="flex flex-col items-center gap-[40px] w-[480px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            회원가입
          </h1>

          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                이름
              </label>
              <Input
                placeholder="이름을 입력해 주세요."
                value={name}
                onChange={setName}
              />
            </div>

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

            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                비밀번호
              </label>
              <PasswordInput
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={setPassword}
                state={
                  password.length === 0
                    ? "default"
                    : passwordValid
                      ? "success"
                      : "danger"
                }
                helperText="* 6~15자의 영문 대/소문자, 숫자 및 특수문자 조합"
              />
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                비밀번호 확인
              </label>
              <PasswordInput
                placeholder="비밀번호를 다시 입력해 주세요."
                value={confirmPassword}
                onChange={setConfirmPassword}
                state={
                  confirmPassword.length === 0
                    ? "default"
                    : passwordsMatch
                      ? "success"
                      : "danger"
                }
                helperText={
                  confirmPassword.length > 0 && !passwordsMatch
                    ? "비밀번호가 일치하지 않습니다."
                    : undefined
                }
              />
            </div>

            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-[18px] h-[18px] accent-[var(--color-primary)]"
              />
              <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
                이용약관 및 개인정보 처리방침에 동의합니다.
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-[16px] w-full">
            <Button
              disabled={!isFormValid}
              onClick={handleSignup}
              className="w-full"
            >
              가입하기
            </Button>

            <div className="flex items-center justify-center gap-[8px] text-[14px] tracking-[-0.42px]">
              <span className="text-[var(--color-gray-400)]">
                이미 계정이 있으신가요?
              </span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[var(--color-primary)] font-semibold cursor-pointer hover:underline"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
