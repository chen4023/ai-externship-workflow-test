// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472&m=dev
// Figma-states: communityDetail
import { type FormEvent, useState } from "react";
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

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim().length === 0) return;
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-10">
        <div className="flex flex-col gap-8 w-300">
          {/* Post header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
              프론트엔드 개발자 취업 준비 팁 공유합니다
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-snug tracking-tight text-gray-primary">
                    김개발
                  </span>
                  <span className="text-xs leading-snug tracking-tight text-gray-400">
                    2025-03-15
                  </span>
                </div>
              </div>
              {isAuthor && (
                <div className="flex items-center gap-2">
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
          <div className="w-full h-px bg-gray-200" />

          {/* Post content */}
          <div className="text-base leading-relaxed tracking-tight text-gray-700 min-h-50">
            <p>
              안녕하세요, 최근 프론트엔드 개발자로 취업에 성공한 김개발입니다.
            </p>
            <p className="mt-4">
              제가 준비하면서 도움이 되었던 내용들을 정리해봤습니다.
              포트폴리오는 2~3개 프로젝트를 깊이 있게 만드는 것이 중요하고,
              기술 면접에서는 JavaScript 기초와 React 동작 원리를
              많이 물어봤습니다.
            </p>
            <p className="mt-4">
              도움이 되셨으면 좋겠습니다. 궁금한 점 있으면 댓글로 남겨주세요!
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200" />

          {/* Comments section */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
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
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2 items-end">
                <CommentInput
                  value={comment}
                  onChange={setComment}
                />
                <CommentSubmitButton
                  type="submit"
                  disabled={comment.trim().length === 0}
                />
              </form>
            )}

            {/* Comment list */}
            <div className="flex flex-col gap-4">
              {MOCK_COMMENTS.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col gap-2 p-4 rounded-sm border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <span className="text-sm font-semibold leading-snug tracking-tight text-gray-primary">
                      {c.author}
                    </span>
                    <span className="text-xs leading-snug tracking-tight text-gray-400">
                      {c.date}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed tracking-tight text-gray-700">
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
