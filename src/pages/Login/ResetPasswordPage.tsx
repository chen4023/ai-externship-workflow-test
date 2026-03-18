// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1814&m=dev
// Figma-states: login
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Button } from "../../shared/ui/Button/Button";
import { Popup } from "../../shared/ui/Popup/Popup";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const passwordValid = password.length >= 6 && password.length <= 15;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isFormValid = passwordValid && passwordsMatch;

  const getPasswordState = () => {
    if (password.length === 0) return "default" as const;
    return passwordValid ? "success" as const : "danger" as const;
  };

  const getConfirmState = () => {
    if (confirmPassword.length === 0) return "default" as const;
    return passwordsMatch ? "success" as const : "danger" as const;
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    setShowPopup(true);
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[40px] w-[348px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            비밀번호 재설정
          </h1>

          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                새 비밀번호
              </label>
              <PasswordInput
                placeholder="새 비밀번호를 입력해 주세요."
                value={password}
                onChange={setPassword}
                state={getPasswordState()}
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
                state={getConfirmState()}
                helperText={
                  confirmPassword.length > 0 && !passwordsMatch
                    ? "비밀번호가 일치하지 않습니다."
                    : undefined
                }
              />
            </div>
          </div>

          <Button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="w-full"
          >
            비밀번호 변경
          </Button>
        </div>
      </main>
      <Footer />

      <Popup
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          navigate("/login");
        }}
        title="비밀번호가 변경되었습니다."
        description="새로운 비밀번호로 로그인해 주세요."
        ctaLabel="로그인하기"
        onCtaClick={() => navigate("/login")}
      />
    </div>
  );
}
