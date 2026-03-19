// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-2311&m=dev
// Figma-states: studentRegistration
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../shared/ui/Dropdown/Dropdown";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";
import { Popup } from "../../shared/ui/Popup/Popup";

const CAMP_OPTIONS = [
  { label: "초격차캠프", value: "super" },
  { label: "사업개발캠프", value: "business" },
  { label: "프로덕트 디자이너 캠프", value: "design" },
];

const GENERATION_OPTIONS = [
  { label: "1기", value: "1" },
  { label: "2기", value: "2" },
  { label: "3기", value: "3" },
];

export function StudentRegistrationPage() {
  const navigate = useNavigate();
  const [camp, setCamp] = useState("");
  const [generation, setGeneration] = useState("");
  const [studentName, setStudentName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const isFormValid =
    camp.length > 0 &&
    generation.length > 0 &&
    studentName.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    setShowPopup(true);
    // TODO: API 연동
  };

  return (
    <>
      <div className="flex flex-col items-center gap-[40px] w-[480px] mx-auto">
        <div className="flex flex-col items-center gap-[16px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            수강생 등록
          </h1>
          <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)] text-center">
            수강 중인 캠프 정보를 등록해 주세요.
          </p>
        </div>

        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
              캠프
            </label>
            <Dropdown
              options={CAMP_OPTIONS}
              value={camp}
              placeholder="캠프를 선택해 주세요."
              onChange={setCamp}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
              기수
            </label>
            <Dropdown
              options={GENERATION_OPTIONS}
              value={generation}
              placeholder="기수를 선택해 주세요."
              onChange={setGeneration}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
              이름
            </label>
            <Input
              placeholder="수강생 이름을 입력해 주세요."
              value={studentName}
              onChange={setStudentName}
            />
          </div>
        </div>

        <Button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className="w-full"
        >
          등록하기
        </Button>
      </div>

      <Popup
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          navigate("/");
        }}
        title="수강생 등록이 완료되었습니다!"
        description="이제 모든 서비스를 이용할 수 있습니다."
        ctaLabel="시작하기"
        onCtaClick={() => navigate("/")}
      />
    </>
  );
}
