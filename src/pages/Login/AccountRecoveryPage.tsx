// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1518&m=dev
// Figma-states: login
// TODO: react-hook-form + zod 스키마 기반 폼 검증으로 리팩토링 예정
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";

type Step = "check" | "email" | "verify" | "complete";

export function AccountRecoveryPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("check");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleRequestVerification = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().length === 0) return;
    setStep("verify");
    // TODO: API 연동 - 인증 메일 발송
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim().length === 0) return;
    setStep("complete");
    // TODO: API 연동 - 인증 코드 확인
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 w-87">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            계정 복구
          </h1>

          {step === "check" && (
            <>
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-base leading-relaxed tracking-tight text-gray-600 text-center">
                  탈퇴한 계정입니다.
                  <br />
                  계정을 복구하시겠습니까?
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button
                  onClick={() => setStep("email")}
                  className="w-full"
                >
                  계정 복구하기
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="w-full"
                >
                  로그인으로 돌아가기
                </Button>
              </div>
            </>
          )}

          {step === "email" && (
            <form onSubmit={handleRequestVerification} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm leading-snug tracking-tight text-gray-600">
                  가입 시 등록한 이메일을 입력하시면 인증 메일을
                  보내드립니다.
                </p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="recovery-email" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    이메일
                  </label>
                  <Input
                    id="recovery-email"
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={setEmail}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={email.trim().length === 0}
                className="w-full"
              >
                인증 메일 발송
              </Button>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerify} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-4 w-full">
                <p className="text-sm leading-snug tracking-tight text-gray-600">
                  이메일로 발송된 인증 코드를 입력해 주세요.
                </p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="recovery-code" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    인증 코드
                  </label>
                  <Input
                    id="recovery-code"
                    placeholder="인증 코드를 입력해 주세요."
                    value={verificationCode}
                    onChange={setVerificationCode}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={verificationCode.trim().length === 0}
                className="w-full"
              >
                인증 확인
              </Button>
            </form>
          )}

          {step === "complete" && (
            <div className="flex flex-col items-center gap-10 w-full">
              <p className="text-base leading-relaxed tracking-tight text-gray-600 text-center">
                계정이 복구되었습니다.
                <br />
                로그인해 주세요.
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="w-full"
              >
                로그인하기
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
