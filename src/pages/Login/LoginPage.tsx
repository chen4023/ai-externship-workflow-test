// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1100&m=dev
// Figma-states: login
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Input } from "../../shared/ui/Input/Input";
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
    <div className="min-h-screen bg-gray-100">
      <Header variant="guest" />
      <main className="flex items-center justify-center pt-22">
        <div className="flex flex-col items-center gap-16 w-87">
          {/* Logo + signup link */}
          <div className="flex flex-col items-center gap-7 w-full">
            <p className="font-bold text-2xl text-gray-primary">
              OZ 오즈코딩스쿨
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-base leading-[1.4] tracking-tight text-gray-600">
                아직 회원이 아니신가요?
              </span>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-base leading-[1.4] tracking-tight text-primary cursor-pointer"
              >
                회원가입 하기
              </button>
            </div>
          </div>

          {/* Social login + form */}
          <div className="flex flex-col gap-10 w-full">
            {/* Social buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                className="flex items-center justify-center h-13 w-full rounded-sm bg-kakao-bg cursor-pointer"
              >
                <span className="text-base tracking-tight text-kakao-text">
                  카카오 간편 로그인 / 가입
                </span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-13 w-full rounded-sm bg-naver-bg cursor-pointer"
              >
                <span className="text-base tracking-tight text-white">
                  네이버 간편 로그인 / 가입
                </span>
              </button>
            </div>

            {/* Email/Password form */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-3 w-full">
                <Input
                  placeholder="아이디 (example@gmail.com)"
                  value={email}
                  onChange={setEmail}
                />
                <div className="flex flex-col gap-2">
                  <PasswordInput
                    placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
                    value={password}
                    onChange={setPassword}
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => navigate("/login/find-id")}
                      className="text-sm leading-[1.4] tracking-tight text-gray-600 py-2 cursor-pointer"
                    >
                      아이디 찾기
                    </button>
                    <span className="text-sm leading-[1.4] tracking-tight text-gray-600 px-2">
                      |
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/login/find-password")}
                      className="text-sm leading-[1.4] tracking-tight text-gray-600 py-2 cursor-pointer"
                    >
                      비밀번호 찾기
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={!isFormValid}
                onClick={handleLogin}
                className="flex items-center justify-center h-13 w-full rounded-sm bg-gray-200 text-base leading-[1.4] tracking-tight text-gray-disabled cursor-pointer disabled:cursor-not-allowed"
              >
                일반회원 로그인
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
