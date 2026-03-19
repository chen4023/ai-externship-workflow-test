// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-2103&m=dev
// Figma-states: signup

import { type FormEvent } from "react";
import { Header } from "../../shared/ui/Header/Header";
import { Input } from "../../shared/ui/Input/Input";
import { PasswordInput } from "../../shared/ui/PasswordInput/PasswordInput";
import { Button } from "../../shared/ui/Button/Button";
import { useSignupForm } from "./model/useSignupForm";

function FormLabel({ label, required, htmlFor }: { label: string; required?: boolean; htmlFor?: string }) {
  return (
    <div className="flex items-start text-base">
      <label htmlFor={htmlFor} className="leading-snug tracking-tight text-gray-primary">
        {label}
      </label>
      {required && (
        <span className="leading-normal tracking-tight text-danger">*</span>
      )}
    </div>
  );
}

export function SignupFormPage() {
  const form = useSignupForm();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header variant="guest" />
      <main className="flex justify-center py-12">
        <form onSubmit={onSubmit} className="bg-white w-132 px-6 py-10">
          {/* Title */}
          <div className="flex flex-col items-center gap-4 mb-9">
            <p className="text-lg font-bold tracking-tight text-center">
              마법같이 빠르게 성장시켜줄
            </p>
            <p className="text-2xl font-bold text-gray-primary">
              OZ 오즈코딩스쿨
            </p>
          </div>

          <p className="text-lg font-semibold leading-snug tracking-tight text-gray-primary mb-9">
            회원가입
          </p>

          <div className="flex flex-col gap-11">
            {/* 이름 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="이름" required htmlFor="signup-name" />
              <Input id="signup-name" placeholder="이름을 입력해주세요" value={form.name} onChange={form.setName} />
            </div>

            {/* 닉네임 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="닉네임" required htmlFor="signup-nickname" />
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input id="signup-nickname" placeholder="닉네임을 입력해주세요" value={form.nickname} onChange={form.setNickname} />
                </div>
                <button type="button" className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0">
                  중복확인
                </button>
              </div>
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="생년월일" required htmlFor="signup-birthdate" />
              <Input id="signup-birthdate" placeholder="8자리 입력해주세요 (ex.20001004)" value={form.birthdate} onChange={form.setBirthdate} />
            </div>

            {/* 성별 */}
            <div className="flex flex-col gap-5">
              <FormLabel label="성별" required />
              <div className="flex gap-5">
                <button type="button" onClick={() => form.setGender("male")} className={`h-10.5 w-20 rounded-full text-base font-semibold tracking-tight cursor-pointer border ${form.gender === "male" ? "bg-primary-100 border-primary text-primary" : "bg-gray-200 border-gray-250 text-gray-600"}`}>
                  남
                </button>
                <button type="button" onClick={() => form.setGender("female")} className={`h-10.5 w-20 rounded-full text-base font-semibold tracking-tight cursor-pointer border ${form.gender === "female" ? "bg-primary-100 border-primary text-primary" : "bg-gray-200 border-gray-250 text-gray-600"}`}>
                  여
                </button>
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <FormLabel label="이메일" required htmlFor="signup-email" />
                  <span className="text-sm font-semibold leading-snug tracking-tight text-primary">
                    로그인 시 아이디로 사용합니다.
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input id="signup-email" placeholder="이메일을 입력해주세요" value={form.email} onChange={form.setEmail} />
                  </div>
                  <button type="button" className="h-12 w-28 rounded-sm border border-primary bg-primary-100 text-base font-semibold tracking-tight text-primary shrink-0">
                    인증코드전송
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input id="signup-email-code" placeholder="전송된 코드를 입력해주세요." value={form.emailCode} onChange={form.setEmailCode} />
                </div>
                <button type="button" className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0">
                  인증번호확인
                </button>
              </div>
            </div>

            {/* 휴대전화 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <FormLabel label="휴대전화" required />
                <div className="flex gap-3">
                  <div className="flex flex-1 items-center gap-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      <Input placeholder="010" value={form.PHONE_PREFIX} onChange={() => {}} state="disabled" disabled />
                    </div>
                    <span className="text-sm text-gray-disabled">-</span>
                    <div className="flex-1 min-w-0">
                      <Input id="signup-phone2" placeholder="" value={form.phone2} onChange={form.setPhone2} />
                    </div>
                    <span className="text-sm text-gray-disabled">-</span>
                    <div className="flex-1 min-w-0">
                      <Input id="signup-phone3" placeholder="" value={form.phone3} onChange={form.setPhone3} />
                    </div>
                  </div>
                  <button type="button" className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0">
                    인증번호전송
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input id="signup-phone-code" placeholder="인증번호 6자리를 입력해주세요" value={form.phoneCode} onChange={form.setPhoneCode} />
                </div>
                <button type="button" className="h-12 w-28 rounded-sm border border-gray-disabled bg-gray-200 text-base font-semibold tracking-tight text-gray-700 shrink-0">
                  인증번호확인
                </button>
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <FormLabel label="비밀번호" required htmlFor="signup-password" />
                  <span className="text-sm font-semibold leading-snug tracking-tight text-primary">
                    8~15자의 영문 대소문자, 숫자, 특수문자 포함
                  </span>
                </div>
                <PasswordInput
                  id="signup-password"
                  placeholder="비밀번호를 입력해주세요"
                  value={form.password}
                  onChange={form.setPassword}
                  state={form.getPasswordState()}
                  autoComplete="new-password"
                />
              </div>
              <PasswordInput
                id="signup-confirm-password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={form.confirmPassword}
                onChange={form.setConfirmPassword}
                state={form.getConfirmPasswordState()}
                helperText={
                  form.confirmPassword.length > 0 && !form.passwordsMatch
                    ? "비밀번호가 일치하지 않습니다."
                    : undefined
                }
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-9">
            <Button type="submit" disabled={!form.isFormValid} className="w-full">
              가입하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
