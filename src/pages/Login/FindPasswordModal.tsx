// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1444&m=dev
// Figma-states: default(1:1444), sent(1:1649)
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";
import { Toast } from "../../shared/ui/Toast/Toast";

interface FindPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="16" height="12" rx="2" stroke="white" strokeWidth="2" />
    <path d="M10 12V8C10 5.79086 11.7909 4 14 4C16.2091 4 18 5.79086 18 8V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="18" r="2" fill="white" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TIMER_SECONDS = 300; // 5분

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function FindPasswordModal({ open, onClose }: FindPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isFormValid = email.trim().length > 0 && isCodeVerified;

  useEffect(() => {
    if (!isCodeSent || timer <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCodeSent, timer]);

  const handleSendCode = () => {
    if (email.trim().length === 0) return;
    setIsCodeSent(true);
    setTimer(TIMER_SECONDS);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // TODO: API - 인증코드 전송
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) return;
    setIsCodeVerified(true);
    if (timerRef.current) clearInterval(timerRef.current);
    // TODO: API - 인증코드 확인
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API - 비밀번호 재설정 링크 발송
  };

  const resetState = () => {
    setEmail("");
    setVerificationCode("");
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setShowToast(false);
    setTimer(TIMER_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const sendBtnActive = email.trim().length > 0;
  const verifyBtnActive = verificationCode.length === 6;

  const actionBtnClass = (active: boolean) =>
    `shrink-0 px-3.5 h-12 rounded-sm border text-sm font-semibold tracking-tight cursor-pointer transition-colors ${
      active
        ? "bg-primary-100 border-primary text-primary"
        : "bg-gray-200 border-gray-disabled text-gray-500 cursor-not-allowed"
    }`;

  return (
    <Modal open={open} onClose={handleClose} className="w-100 max-w-[90vw]">
      <div className="relative flex flex-col p-6 gap-6">
        {/* Toast */}
        {showToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <Toast message="전송 완료! 이메일을 확인해주세요." />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-300">
              <LockIcon />
            </div>
            <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-primary">
              비밀번호 찾기
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-gray-600 cursor-pointer"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 설명 */}
        <p className="text-sm leading-snug tracking-tight text-gray-600">
          이메일로 비밀번호 재설정 링크를 보내드려요.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* 이메일 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                이메일<span className="text-danger">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="이메일을 입력해 주세요."
                  value={email}
                  onChange={setEmail}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!sendBtnActive}
                  className={actionBtnClass(sendBtnActive)}
                >
                  인증코드전송
                </button>
              </div>
            </div>

            {/* 인증번호 */}
            {isCodeSent && (
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="인증번호 6자리 입력"
                      value={verificationCode}
                      onChange={(v) =>
                        setVerificationCode(v.replace(/\D/g, "").slice(0, 6))
                      }
                      maxLength={6}
                    />
                    {!isCodeVerified && timer > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-danger">
                        {formatTime(timer)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={!verifyBtnActive}
                    className={actionBtnClass(verifyBtnActive)}
                  >
                    인증코드확인
                  </button>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full h-13"
          >
            비밀번호 찾기
          </Button>
        </form>
      </div>
    </Modal>
  );
}
