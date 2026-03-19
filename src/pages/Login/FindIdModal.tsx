// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-1220&m=dev
// Figma-states: default(1:1220), error(1:1300), found(1:1382)
import { type FormEvent, useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";

type FindIdStep = "form" | "error" | "found";

interface FindIdModalProps {
  open: boolean;
  onClose: () => void;
  onOpenFindPassword: () => void;
}

const ProfileIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="10" r="5" stroke="white" strokeWidth="2" />
    <path d="M5 24C5 19.5817 8.58172 16 13 16H15C19.4183 16 23 19.5817 23 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function FindIdModal({ open, onClose, onOpenFindPassword }: FindIdModalProps) {
  const [step, setStep] = useState<FindIdStep>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [foundEmail, setFoundEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    isCodeVerified;

  const handleSendCode = () => {
    if (phone.trim().length === 0) return;
    setIsCodeSent(true);
    // TODO: API - 인증번호 전송
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) return;
    setIsCodeVerified(true);
    // TODO: API - 인증번호 확인
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연동 - 아이디 찾기
    // 성공: setFoundEmail("ozcoding@g****.com"); setStep("found");
    // 실패: setErrorMessage("입력한 이름과 휴대폰 번호로 등록된 아이디(이메일)이 존재하지 않습니다."); setStep("error");
    setStep("form");
  };

  const resetState = () => {
    setStep("form");
    setName("");
    setPhone("");
    setVerificationCode("");
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setFoundEmail("");
    setErrorMessage("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleGoToFindPassword = () => {
    resetState();
    onClose();
    onOpenFindPassword();
  };

  const verifyBtnActive = verificationCode.length === 6;
  const sendBtnActive = phone.trim().length > 0;

  const actionBtnClass = (active: boolean) =>
    `shrink-0 px-3.5 h-12 rounded-sm border text-sm font-semibold tracking-tight cursor-pointer transition-colors ${
      active
        ? "bg-primary-100 border-primary text-primary"
        : "bg-gray-200 border-gray-disabled text-gray-500 cursor-not-allowed"
    }`;

  return (
    <Modal open={open} onClose={handleClose} className="w-100 max-w-[90vw]">
      <div className="flex flex-col p-6 gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-300">
              <ProfileIcon />
            </div>
            <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-primary">
              아이디 찾기
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

        {step === "found" ? (
          <div className="flex flex-col gap-6">
            <p className="text-sm leading-snug tracking-tight text-gray-600">
              입력하신 정보와 일치하는 아이디입니다.
            </p>
            <div className="flex items-center justify-center px-4 py-3.5 rounded-sm bg-gray-100">
              <span className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
                {foundEmail}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-13"
              >
                로그인
              </Button>
              <Button
                variant="primary"
                onClick={handleGoToFindPassword}
                className="flex-1 h-13"
              >
                비밀번호 찾기
              </Button>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-sm tracking-tight text-gray-500 text-center cursor-pointer hover:text-gray-700 transition-colors"
            >
              네이버 간편 로그인 / 가입
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {step === "error" && errorMessage && (
              <p className="text-sm leading-snug tracking-tight text-danger">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col gap-4">
              {/* 이름 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                  이름<span className="text-danger">*</span>
                </label>
                <Input
                  placeholder="이름을 입력해 주세요."
                  value={name}
                  onChange={setName}
                />
              </div>

              {/* 휴대전화 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                  휴대전화<span className="text-danger">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="숫자만 입력"
                    value={phone}
                    onChange={(v) => setPhone(v.replace(/\D/g, ""))}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={!sendBtnActive}
                    className={actionBtnClass(sendBtnActive)}
                  >
                    인증번호전송
                  </button>
                </div>
              </div>

              {/* 인증번호 */}
              {isCodeSent && (
                <div className="flex gap-2">
                  <Input
                    placeholder="인증번호 6자리 입력"
                    value={verificationCode}
                    onChange={(v) =>
                      setVerificationCode(v.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={!verifyBtnActive}
                    className={actionBtnClass(verifyBtnActive)}
                  >
                    인증번호확인
                  </button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full h-13"
            >
              아이디 찾기
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}
