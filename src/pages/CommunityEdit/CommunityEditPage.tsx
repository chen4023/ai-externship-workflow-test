// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5757&m=dev
// Figma-states: communityEdit
import { type FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../shared/ui/Input/Input";
import { Textarea } from "../../shared/ui/Textarea/Textarea";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연동
    navigate(`/community/${postId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-300">
      <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
        게시글 수정
      </h1>

      <div className="flex flex-col gap-5">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="edit-title" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
            제목
          </label>
          <Input
            id="edit-title"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={setTitle}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label htmlFor="edit-content" className="text-sm font-semibold leading-snug tracking-tight text-gray-700">
            내용
          </label>
          <Textarea
            id="edit-content"
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
          onClick={() => navigate(`/community/${postId}`)}
        >
          취소
        </Button>
        <Button type="submit" disabled={!isFormValid}>
          수정하기
        </Button>
      </div>
    </form>
  );
}
