// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9690&m=dev
// Figma-states: qnaCreate
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Dropdown } from "../../shared/ui/Dropdown/Dropdown";
import { Button } from "../../shared/ui/Button/Button";

const MAJOR_CATEGORIES = [
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
  { label: "기타", value: "etc" },
];

const MINOR_CATEGORIES = [
  { label: "HTML/CSS", value: "html-css" },
  { label: "JavaScript", value: "javascript" },
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
];

export function QnaCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [majorCategory, setMajorCategory] = useState("");
  const [minorCategory, setMinorCategory] = useState("");
  const [content, setContent] = useState("");

  const isFormValid =
    title.trim().length > 0 &&
    majorCategory.length > 0 &&
    content.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: API 연동
    navigate("/qna");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[32px] w-[1200px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            질문 등록
          </h1>

          <div className="flex flex-col gap-[20px]">
            {/* Category selectors */}
            <div className="flex gap-[16px]">
              <div className="flex flex-col gap-[8px] flex-1">
                <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                  대분류
                </label>
                <Dropdown
                  options={MAJOR_CATEGORIES}
                  value={majorCategory}
                  placeholder="대분류를 선택해 주세요."
                  onChange={setMajorCategory}
                />
              </div>
              <div className="flex flex-col gap-[8px] flex-1">
                <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                  중분류
                </label>
                <Dropdown
                  options={MINOR_CATEGORIES}
                  value={minorCategory}
                  placeholder="중분류를 선택해 주세요."
                  onChange={setMinorCategory}
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                제목
              </label>
              <Input
                placeholder="질문 제목을 입력해 주세요."
                value={title}
                onChange={setTitle}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                내용
              </label>
              <textarea
                placeholder="질문 내용을 입력해 주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-[16px] py-[12px] rounded-[4px] border border-[var(--color-gray-disabled)] bg-white text-[14px] leading-[1.6] tracking-[-0.42px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)] outline-none resize-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[12px] justify-end">
            <Button variant="ghost" onClick={() => navigate("/qna")}>
              취소
            </Button>
            <Button disabled={!isFormValid} onClick={handleSubmit}>
              등록하기
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
