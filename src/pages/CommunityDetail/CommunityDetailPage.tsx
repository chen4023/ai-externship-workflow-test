// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472&m=dev
// Figma-states: communityDetail
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { CommentInput } from "../../shared/ui/CommentInput/CommentInput";
import { CommentSubmitButton } from "../../shared/ui/CommentSubmitButton/CommentSubmitButton";
import { Button } from "../../shared/ui/Button/Button";
import { ConfirmModal } from "../../shared/ui/Modal/Modal";
import { SortModal } from "../../shared/ui/SortModal/SortModal";

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "이수강",
    date: "2025-03-15",
    content: "좋은 글 감사합니다! 많은 도움이 되었어요.",
  },
  {
    id: 2,
    author: "박코딩",
    date: "2025-03-15",
    content: "저도 비슷한 경험을 했는데 공감이 됩니다.",
  },
];

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
];

export function CommunityDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentSort, setCommentSort] = useState("latest");

  const isAuthor = true;
  const isLoggedIn = true;

  const handleDelete = () => {
    setShowDeleteModal(false);
    navigate("/community");
  };

  const handleCommentSubmit = () => {
    if (comment.trim().length === 0) return;
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[32px] w-[1200px]">
          {/* Post header */}
          <div className="flex flex-col gap-[16px]">
            <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
              프론트엔드 개발자 취업 준비 팁 공유합니다
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[var(--color-gray-200)]" />
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-primary)]">
                    김개발
                  </span>
                  <span className="text-[12px] leading-[1.4] tracking-[-0.36px] text-[var(--color-gray-400)]">
                    2025-03-15
                  </span>
                </div>
              </div>
              {isAuthor && (
                <div className="flex items-center gap-[8px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate(`/community/${postId}/edit`)
                    }
                  >
                    수정
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[var(--color-gray-200)]" />

          {/* Post content */}
          <div className="text-[16px] leading-[1.8] tracking-[-0.48px] text-[var(--color-gray-700)] min-h-[200px]">
            <p>
              안녕하세요, 최근 프론트엔드 개발자로 취업에 성공한 김개발입니다.
            </p>
            <p className="mt-[16px]">
              제가 준비하면서 도움이 되었던 내용들을 정리해봤습니다.
              포트폴리오는 2~3개 프로젝트를 깊이 있게 만드는 것이 중요하고,
              기술 면접에서는 JavaScript 기초와 React 동작 원리를
              많이 물어봤습니다.
            </p>
            <p className="mt-[16px]">
              도움이 되셨으면 좋겠습니다. 궁금한 점 있으면 댓글로 남겨주세요!
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[var(--color-gray-200)]" />

          {/* Comments section */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)]">
                댓글 {MOCK_COMMENTS.length}
              </p>
              <SortModal
                options={SORT_OPTIONS}
                value={commentSort}
                onChange={setCommentSort}
              />
            </div>

            {/* Comment input */}
            {isLoggedIn && (
              <div className="flex flex-col gap-[8px] items-end">
                <CommentInput
                  value={comment}
                  onChange={setComment}
                />
                <CommentSubmitButton
                  disabled={comment.trim().length === 0}
                  onClick={handleCommentSubmit}
                />
              </div>
            )}

            {/* Comment list */}
            <div className="flex flex-col gap-[16px]">
              {MOCK_COMMENTS.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col gap-[8px] p-[16px] rounded-[4px] border border-[var(--color-gray-200)]"
                >
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[32px] h-[32px] rounded-full bg-[var(--color-gray-200)]" />
                    <span className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-primary)]">
                      {c.author}
                    </span>
                    <span className="text-[12px] leading-[1.4] tracking-[-0.36px] text-[var(--color-gray-400)]">
                      {c.date}
                    </span>
                  </div>
                  <p className="text-[14px] leading-[1.6] tracking-[-0.42px] text-[var(--color-gray-700)]">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmModal
        open={showDeleteModal}
        message="정말 이 게시글을 삭제하시겠습니까?"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
