// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1992&m=dev
// Figma-states: signup
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header variant="guest" />
      <main className="flex items-center justify-center pt-22">
        <div className="flex flex-col items-center gap-16 w-87">
          {/* Logo + login link */}
          <div className="flex flex-col items-center gap-7 w-full">
            <p className="font-bold text-2xl text-gray-primary">
              OZ 오즈코딩스쿨
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-base leading-[1.4] tracking-tight text-gray-600">
                현재 회원이신가요?
              </span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-base leading-[1.4] tracking-tight text-primary cursor-pointer"
              >
                로그인하기
              </button>
            </div>
          </div>

          {/* Social signup + normal link */}
          <div className="flex flex-col items-center gap-9 w-full">
            <div className="flex flex-col gap-4 w-full">
              <button
                type="button"
                className="flex items-center justify-center h-13 w-full rounded-sm bg-kakao-bg cursor-pointer"
              >
                <span className="text-base tracking-tight text-kakao-text">
                  카카오로 3초만에 가입하기
                </span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-13 w-full rounded-sm bg-naver-bg cursor-pointer"
              >
                <span className="text-base tracking-tight text-white">
                  네이버로 가입하기
                </span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => navigate("/signup/form")}
              className="text-base leading-[1.4] tracking-tight text-gray-600 underline cursor-pointer text-center"
            >
              일반회원 가입
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
