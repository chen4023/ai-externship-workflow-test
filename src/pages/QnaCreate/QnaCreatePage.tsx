// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9690&m=dev
// Figma-states: qnaCreate
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Textarea } from "../../shared/ui/Textarea/Textarea";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연동
    navigate("/qna");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-300">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            질문 등록
          </h1>

          <div className="flex flex-col gap-5">
            {/* Category selectors */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="qna-major-cat" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                  대분류
                </label>
                <Dropdown
                  options={MAJOR_CATEGORIES}
                  value={majorCategory}
                  placeholder="대분류를 선택해 주세요."
                  onChange={setMajorCategory}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="qna-minor-cat" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
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
            <div className="flex flex-col gap-2">
              <label htmlFor="qna-title" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                제목
              </label>
              <Input
                id="qna-title"
                placeholder="질문 제목을 입력해 주세요."
                value={title}
                onChange={setTitle}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <label htmlFor="qna-content" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                내용
              </label>
              <Textarea
                id="qna-content"
                placeholder="질문 내용을 입력해 주세요."
                value={content}
                onChange={setContent}
                rows={12}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button variant="ghost" type="button" onClick={() => navigate("/qna")}>
              취소
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              등록하기
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
