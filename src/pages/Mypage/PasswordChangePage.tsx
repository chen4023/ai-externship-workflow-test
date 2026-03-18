// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5510&m=dev
// Figma-states: mypage
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { SidebarButton } from "../../shared/ui/SidebarButton/SidebarButton";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Button } from "../../shared/ui/Button/Button";

export function PasswordChangePage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const newPasswordValid =
    newPassword.length >= 6 && newPassword.length <= 15;
  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;
  const isFormValid =
    currentPassword.length > 0 && newPasswordValid && passwordsMatch;

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: API 연동
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
            <SidebarButton active>비밀번호 변경</SidebarButton>
            <SidebarButton onClick={() => navigate("/mypage/quiz")}>
              쪽지시험
            </SidebarButton>
          </aside>

          {/* Content */}
          <section className="flex-1 flex flex-col gap-[40px]">
            <h2 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
              비밀번호 변경
            </h2>

            <div className="flex flex-col gap-[20px] max-w-[480px]">
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                  현재 비밀번호
                </label>
                <PasswordInput
                  placeholder="현재 비밀번호를 입력해 주세요."
                  value={currentPassword}
                  onChange={setCurrentPassword}
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                  새 비밀번호
                </label>
                <PasswordInput
                  placeholder="새 비밀번호를 입력해 주세요."
                  value={newPassword}
                  onChange={setNewPassword}
                  state={
                    newPassword.length === 0
                      ? "default"
                      : newPasswordValid
                        ? "success"
                        : "danger"
                  }
                  helperText="* 6~15자의 영문 대/소문자, 숫자 및 특수문자 조합"
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                  새 비밀번호 확인
                </label>
                <PasswordInput
                  placeholder="새 비밀번호를 다시 입력해 주세요."
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
            </div>

            <Button
              disabled={!isFormValid}
              onClick={handleSubmit}
              className="w-fit"
            >
              비밀번호 변경
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
