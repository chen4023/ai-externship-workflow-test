// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1220&m=dev
// Figma-states: default(1:1220), error(1:1300), found(1:1382)
// TODO: react-hook-form + zod 스키마 기반 폼 검증으로 리팩토링 예정
import { type FormEvent, useState } from "react";
import { Input } from "../../../shared/ui/Input/Input";

type Step = "form" | "error" | "found";

interface FindIdModalProps {
  open: boolean;
  onClose: () => void;
  onOpenFindPassword: () => void;
}

export function FindIdModal({ open, onClose, onOpenFindPassword }: FindIdModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [foundEmail] = useState("ozcoding@g****.com");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setStep("form");
    setName("");
    setPhone("");
    setCode("");
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: API — 성공 시 setStep("found"), 실패 시 setStep("error")
    setErrorMsg("입력한 이름과 휴대폰 번호로 등록된\n아이디(이메일)이 존재하지 않습니다.");
    setStep("error");
  };

  const handleGoPassword = () => {
    handleClose();
    onOpenFindPassword();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-primary/60" onClick={handleClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="아이디 찾기"
        className="relative bg-white rounded-xl p-6"
        style={{ width: 396 }}
      >
        <div className="flex flex-col gap-2.5">
          {/* X close */}
          <div className="flex justify-end h-6 items-center">
            <button type="button" onClick={handleClose} aria-label="닫기" className="cursor-pointer p-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-200 overflow-hidden">
                <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                  <circle cx="6" cy="4" r="3" stroke="white" strokeWidth="1.5" />
                  <path d="M1 14C1 11.2386 3.23858 9 6 9C8.76142 9 11 11.2386 11 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold leading-[1.4] tracking-tight text-gray-primary">
                아이디 찾기
              </h2>
            </div>

            {step === "found" ? (
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-4 items-center">
                  <p className="text-sm leading-[1.4] tracking-tight text-gray-600 text-center">
                    입력하신 정보와 일치하는 아이디입니다.
                  </p>
                  <div className="flex items-center justify-center w-full px-4 py-5 rounded-sm bg-gray-100">
                    <span className="text-base leading-[1.4] tracking-tight text-gray-primary">
                      {foundEmail}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <button type="button" onClick={handleClose} className="flex-1 h-13 rounded-sm border border-gray-disabled text-base leading-[1.4] tracking-tight text-gray-primary cursor-pointer">
                      로그인
                    </button>
                    <button type="button" onClick={handleGoPassword} className="flex-1 h-13 rounded-sm bg-primary text-base leading-[1.4] tracking-tight text-primary-100 cursor-pointer">
                      비밀번호 찾기
                    </button>
                  </div>
                  <button type="button" onClick={handleClose} className="text-base leading-[1.4] tracking-tight text-gray-600 underline text-center cursor-pointer">
                    네이버 간편 로그인 / 가입
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
                {step === "error" && (
                  <p className="text-sm leading-[1.4] tracking-tight text-danger text-center whitespace-pre-line">
                    {errorMsg}
                  </p>
                )}
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-5">
                    <label htmlFor="find-id-name" className="flex text-base">
                      <span className="leading-[1.4] tracking-tight text-gray-primary">이름</span>
                      <span className="text-danger">*</span>
                    </label>
                    <Input id="find-id-name" placeholder="이름을 입력해주세요" value={name} onChange={setName} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="find-id-phone" className="flex text-base">
                      <span className="leading-[1.4] tracking-tight text-gray-primary">휴대전화</span>
                      <span className="text-danger">*</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input id="find-id-phone" placeholder="숫자만 입력해주세요" value={phone} onChange={(v) => setPhone(v.replace(/\D/g, ""))} />
                        </div>
                        <button type="button" className="shrink-0 w-28 h-12 bg-gray-200 border border-gray-disabled rounded-sm text-base font-semibold leading-[1.4] tracking-tight text-gray-700 cursor-pointer">
                          인증번호전송
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input placeholder="인증번호 6자리를 입력해주세요" value={code} onChange={(v) => setCode(v.replace(/\D/g, "").slice(0, 6))} />
                        </div>
                        <button type="button" className="shrink-0 w-28 h-12 bg-gray-200 border border-gray-disabled rounded-sm text-base font-semibold leading-[1.4] tracking-tight text-gray-700 cursor-pointer">
                          인증번호확인
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full h-13 rounded-sm bg-primary text-base leading-[1.4] tracking-tight text-primary-100 cursor-pointer">
                  아이디 찾기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
