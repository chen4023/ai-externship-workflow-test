// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5561&m=dev
// Figma-states: communityCreate
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Textarea } from "../../shared/ui/Textarea/Textarea";
import { Button } from "../../shared/ui/Button/Button";

export function CommunityCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isFormValid =
    title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연동
    navigate("/community");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-300">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            글 작성하기
          </h1>

          <div className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="community-title" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                제목
              </label>
              <Input
                id="community-title"
                placeholder="제목을 입력해 주세요."
                value={title}
                onChange={setTitle}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <label htmlFor="community-content" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
                내용
              </label>
              <Textarea
                id="community-content"
                placeholder="내용을 입력해 주세요."
                value={content}
                onChange={setContent}
                rows={14}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate("/community")}
            >
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
