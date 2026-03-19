// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1444&m=dev
// Figma-states: default(1:1444), sent(1:1649)
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import { Toast } from "../../shared/ui/Toast/Toast";

interface FindPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const TIMER_SECONDS = 300;

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function FindPasswordModal({ open, onClose }: FindPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!codeSent || timer <= 0) {
      if (ref.current) clearInterval(ref.current);
      return;
    }
    ref.current = setInterval(() => {
      setTimer((p) => {
        if (p <= 1) { if (ref.current) clearInterval(ref.current); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [codeSent, timer]);

  const handleClose = () => {
    setEmail(""); setCode(""); setCodeSent(false); setShowToast(false);
    setTimer(TIMER_SECONDS);
    if (ref.current) clearInterval(ref.current);
    onClose();
  };

  const handleSendCode = () => {
    if (email.trim().length === 0) return;
    setCodeSent(true);
    setTimer(TIMER_SECONDS);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: API — 비밀번호 재설정
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-primary/60" onClick={handleClose} />

      {showToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-60">
          <Toast message="전송 완료! 이메일을 확인해주세요." variant="inline" />
        </div>
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="비밀번호 찾기"
        className="relative bg-white rounded-xl p-6"
        style={{ width: 396 }}
      >
        <div className="flex flex-col gap-2.5">
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
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <rect x="1" y="7" width="12" height="8" rx="1.5" stroke="white" strokeWidth="1.5" />
                  <path d="M4 7V5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="7" cy="11" r="1.5" fill="white" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold leading-[1.4] tracking-tight text-gray-primary">
                비밀번호 찾기
              </h2>
              <p className="text-sm leading-[1.4] tracking-tight text-gray-600 text-center">
                이메일로 비밀번호 재설정 링크를 보내드려요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
              <div className="flex flex-col gap-4">
                <label htmlFor="find-pw-email" className="flex text-base">
                  <span className="leading-[1.4] tracking-tight text-gray-primary">이메일</span>
                  <span className="text-danger">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input id="find-pw-email" placeholder="가입한 이메일을 입력해 주세요." value={email} onChange={setEmail} />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className={`shrink-0 w-28 h-12 rounded-sm border text-base font-semibold leading-[1.4] tracking-tight cursor-pointer ${
                      codeSent
                        ? "bg-primary-100 border-primary text-primary"
                        : "bg-gray-200 border-gray-disabled text-gray-700"
                    }`}
                  >
                    인증코드전송
                  </button>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="인증번호 6자리를 입력해주세요"
                      value={code}
                      onChange={(v) => setCode(v.replace(/\D/g, "").slice(0, 6))}
                    />
                    {codeSent && timer > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-danger">
                        {formatTime(timer)}
                      </span>
                    )}
                  </div>
                  <button type="button" className="shrink-0 w-28 h-12 bg-gray-200 border border-gray-disabled rounded-sm text-base font-semibold leading-[1.4] tracking-tight text-gray-700 cursor-pointer">
                    인증코드확인
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full h-13 rounded-sm bg-primary text-base leading-[1.4] tracking-tight text-primary-100 cursor-pointer">
                비밀번호 찾기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
