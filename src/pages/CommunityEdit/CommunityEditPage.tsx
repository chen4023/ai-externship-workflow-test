// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5757&m=dev
// Figma-states: communityEdit
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { Input } from "../../shared/ui/Input/Input";
import { Button } from "../../shared/ui/Button/Button";

export function CommunityEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState(
    "프론트엔드 개발자 취업 준비 팁 공유합니다",
  );
  const [content, setContent] = useState(
    "안녕하세요, 최근 프론트엔드 개발자로 취업에 성공한 김개발입니다.\n\n제가 준비하면서 도움이 되었던 내용들을 정리해봤습니다.",
  );

  const isFormValid =
    title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: API 연동
    navigate(`/community/${postId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[32px] w-[1200px]">
          <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
            게시글 수정
          </h1>

          <div className="flex flex-col gap-[20px]">
            {/* Title */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-700)]">
                제목
              </label>
              <Input
                placeholder="제목을 입력해 주세요."
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
                placeholder="내용을 입력해 주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                className="w-full px-[16px] py-[12px] rounded-[4px] border border-[var(--color-gray-disabled)] bg-white text-[14px] leading-[1.6] tracking-[-0.42px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)] outline-none resize-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[12px] justify-end">
            <Button
              variant="ghost"
              onClick={() => navigate(`/community/${postId}`)}
            >
              취소
            </Button>
            <Button disabled={!isFormValid} onClick={handleSubmit}>
              수정하기
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
