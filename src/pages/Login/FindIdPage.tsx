// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1220&m=dev
// Figma-states: login
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";

export function FindIdPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const isFormValid = name.trim().length > 0 && email.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연동 - 실패 시 setError(true), 성공 시 setFoundId(result)
    setError(false);
    setFoundId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="guest" />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 w-87">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            아이디 찾기
          </h1>

          {foundId ? (
            <div className="flex flex-col items-center gap-10 w-full">
              <p className="text-base leading-snug tracking-tight text-gray-600 text-center">
                회원님의 아이디는{" "}
                <span className="font-semibold text-primary">
                  {foundId}
                </span>{" "}
                입니다.
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="w-full"
              >
                로그인하기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <label htmlFor="find-id-name" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    이름
                  </label>
                  <Input
                    id="find-id-name"
                    placeholder="이름을 입력해 주세요."
                    value={name}
                    onChange={setName}
                    state={error ? "danger" : undefined}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="find-id-email" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                    이메일
                  </label>
                  <Input
                    id="find-id-email"
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={setEmail}
                    state={error ? "danger" : undefined}
                    dangerText={
                      error
                        ? "일치하는 회원 정보가 없습니다."
                        : undefined
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full"
                >
                  아이디 찾기
                </Button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm tracking-tight text-gray-500 text-center cursor-pointer hover:text-gray-700 transition-colors"
                >
                  로그인으로 돌아가기
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
