// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-2103&m=dev
// Figma-states: signup
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Input } from "../../shared/ui/Input/Input";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Button } from "../../shared/ui/Button/Button";

type Gender = "male" | "female" | null;

function FormLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="flex items-start text-base">
      <span className="leading-[1.4] tracking-tight text-gray-primary">
        {label}
      </span>
      {required && (
        <span className="leading-normal tracking-tight text-danger">*</span>
      )}
    </div>
  );
}

export function SignupFormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<Gender>(null);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValid = password.length >= 8 && password.length <= 15;
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const isFormValid =
    name.trim().length > 0 &&
    nickname.trim().length > 0 &&
    birthdate.trim().length === 8 &&
    gender !== null &&
    email.trim().length > 0 &&
    passwordValid &&
    passwordsMatch;

  const handleSubmit = () => {
    if (!isFormValid) return;
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header variant="guest" />
      <main className="flex justify-center py-12">
        <div className="bg-white w-132 px-6 py-10">
          {/* Title */}
          <div className="flex flex-col items-center gap-4 mb-9">
            <p className="text-lg font-bold tracking-tight text-center">
              마법같이 빠르게 성장시켜줄
            </p>
            <p className="text-2xl font-bold text-gray-primary">
              OZ 오즈코딩스쿨
            </p>
          </div>

          <p className="text-lg font-semibold leading-[1.4] tracking-tight text-gray-primary mb-9">
            회원가입
          </p>

          <div className="flex flex-col gap-11">
            {/* 이름 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="이름" required />
              <Input placeholder="이름을 입력해주세요" value={name} onChange={setName} />
            </div>

            {/* 닉네임 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="닉네임" required />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input placeholder="닉네임을 입력해주세요" value={nickname} onChange={setNickname} />
                </div>
                <button
                  type="button"
                  className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0"
                >
                  중복확인
                </button>
              </div>
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="생년월일" required />
              <Input
                placeholder="8자리 입력해주세요 (ex.20001004)"
                value={birthdate}
                onChange={setBirthdate}
              />
            </div>

            {/* 성별 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="성별" required />
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`h-10.5 w-20 rounded-full text-base font-semibold tracking-tight cursor-pointer border ${
                    gender === "male"
                      ? "bg-primary-100 border-primary text-primary"
                      : "bg-gray-200 border-gray-250 text-gray-600"
                  }`}
                >
                  남
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`h-10.5 w-20 rounded-full text-base font-semibold tracking-tight cursor-pointer border ${
                    gender === "female"
                      ? "bg-primary-100 border-primary text-primary"
                      : "bg-gray-200 border-gray-250 text-gray-600"
                  }`}
                >
                  여
                </button>
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <FormLabel label="이메일" required />
                  <span className="text-sm font-semibold leading-[1.4] tracking-tight text-primary">
                    로그인 시 아이디로 사용합니다.
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input placeholder="이메일을 입력해주세요" value={email} onChange={setEmail} />
                  </div>
                  <button
                    type="button"
                    className="h-12 w-28 rounded-sm border border-primary bg-primary-100 text-base font-semibold tracking-tight text-primary shrink-0"
                  >
                    인증코드전송
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input placeholder="전송된 코드를 입력해주세요." value={emailCode} onChange={setEmailCode} />
                </div>
                <button
                  type="button"
                  className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0"
                >
                  인증번호확인
                </button>
              </div>
            </div>

            {/* 휴대전화 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <FormLabel label="휴대전화" required />
                <div className="flex gap-3">
                  <div className="flex flex-1 items-center gap-1">
                    <div className="flex-1">
                      <Input placeholder="010" value={phone1} onChange={() => {}} state="disabled" disabled />
                    </div>
                    <span className="text-sm text-gray-disabled">-</span>
                    <div className="flex-1">
                      <Input placeholder="" value={phone2} onChange={setPhone2} />
                    </div>
                    <span className="text-sm text-gray-disabled">-</span>
                    <div className="flex-1">
                      <Input placeholder="" value={phone3} onChange={setPhone3} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0"
                  >
                    인증번호전송
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input placeholder="인증번호 6자리를 입력해주세요" value={phoneCode} onChange={setPhoneCode} />
                </div>
                <button
                  type="button"
                  className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0"
                >
                  인증번호확인
                </button>
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <FormLabel label="비밀번호" required />
                  <span className="text-sm font-semibold leading-[1.4] tracking-tight text-primary">
                    8~15자의 영문 대소문자, 숫자, 특수문자 포함
                  </span>
                </div>
                <PasswordInput
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={setPassword}
                  state={
                    password.length === 0
                      ? "default"
                      : passwordValid
                        ? "success"
                        : "danger"
                  }
                />
              </div>
              <PasswordInput
                placeholder="비밀번호를 다시 입력해주세요"
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

          {/* Submit */}
          <div className="mt-9">
            <Button
              disabled={!isFormValid}
              onClick={handleSubmit}
              className="w-full"
            >
              가입하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
