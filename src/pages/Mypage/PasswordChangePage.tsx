// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5510&m=dev
// Figma-states: mypage
import { type FormEvent, useState } from "react";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { MypageSidebar } from "../../shared/ui/MypageSidebar/MypageSidebar";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Button } from "../../shared/ui/Button/Button";

export function PasswordChangePage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const newPasswordValid =
    newPassword.length >= 8 && newPassword.length <= 15;
  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;
  const isFormValid =
    currentPassword.length > 0 && newPasswordValid && passwordsMatch;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연동
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
              비밀번호 변경
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-5 max-w-120">
                <div className="flex flex-col gap-2">
                  <label htmlFor="pw-current" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    현재 비밀번호
                  </label>
                  <PasswordInput
                    id="pw-current"
                    placeholder="현재 비밀번호를 입력해 주세요."
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="pw-new" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    새 비밀번호
                  </label>
                  <PasswordInput
                    id="pw-new"
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
                    helperText="* 8~15자의 영문 대/소문자, 숫자 및 특수문자 조합"
                    autoComplete="new-password"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="pw-confirm" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    새 비밀번호 확인
                  </label>
                  <PasswordInput
                    id="pw-confirm"
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
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-fit"
              >
                비밀번호 변경
              </Button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
