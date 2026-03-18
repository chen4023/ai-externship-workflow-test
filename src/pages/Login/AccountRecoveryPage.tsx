// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1518&m=dev
// Figma-states: login
import { useState } from "react";
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

  const handleRequestVerification = () => {
    if (email.trim().length === 0) return;
    setStep("verify");
    // TODO: API 연동 - 인증 메일 발송
  };

  const handleVerify = () => {
    if (verificationCode.trim().length === 0) return;
    setStep("complete");
    // TODO: API 연동 - 인증 코드 확인
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[40px] w-[348px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            계정 복구
          </h1>

          {step === "check" && (
            <>
              <div className="flex flex-col items-center gap-[16px] w-full">
                <p className="text-[16px] leading-[1.6] tracking-[-0.48px] text-[var(--color-gray-600)] text-center">
                  탈퇴한 계정입니다.
                  <br />
                  계정을 복구하시겠습니까?
                </p>
              </div>
              <div className="flex flex-col gap-[12px] w-full">
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
            <>
              <div className="flex flex-col gap-[8px] w-full">
                <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
                  가입 시 등록한 이메일을 입력하시면 인증 메일을
                  보내드립니다.
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
              <Button
                disabled={email.trim().length === 0}
                onClick={handleRequestVerification}
                className="w-full"
              >
                인증 메일 발송
              </Button>
            </>
          )}

          {step === "verify" && (
            <>
              <div className="flex flex-col gap-[16px] w-full">
                <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
                  이메일로 발송된 인증 코드를 입력해 주세요.
                </p>
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                    인증 코드
                  </label>
                  <Input
                    placeholder="인증 코드를 입력해 주세요."
                    value={verificationCode}
                    onChange={setVerificationCode}
                  />
                </div>
              </div>
              <Button
                disabled={verificationCode.trim().length === 0}
                onClick={handleVerify}
                className="w-full"
              >
                인증 확인
              </Button>
            </>
          )}

          {step === "complete" && (
            <div className="flex flex-col items-center gap-[40px] w-full">
              <p className="text-[16px] leading-[1.6] tracking-[-0.48px] text-[var(--color-gray-600)] text-center">
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
