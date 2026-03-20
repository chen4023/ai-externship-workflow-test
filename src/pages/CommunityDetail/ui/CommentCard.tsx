// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { useState, type FormEvent } from 'react';
import { CommentInput } from '../../../shared/ui/CommentInput/CommentInput';
import { CommentSubmitButton } from '../../../shared/ui/CommentSubmitButton/CommentSubmitButton';
import type { Comment } from '../lib/types';
import { COMMENT_MAX_LENGTH } from '../lib/constants';

interface CommentCardProps {
  comment: Comment;
  currentUserId: number | null;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  isUpdating: boolean;
  isDeleting: boolean;
  showDivider?: boolean;
}

function formatCommentDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function CommentCard({
  comment,
  currentUserId,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
  showDivider = true,
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isAuthor = currentUserId === comment.author.id;

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editContent.trim().length === 0) return;
    if (editContent.length > COMMENT_MAX_LENGTH) return;
    onUpdate(comment.id, editContent.trim());
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4 items-start">
      {/* 프로필 이미지 48px */}
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
        {comment.author.profile_img_url && (
          <img
            src={comment.author.profile_img_url}
            alt={`${comment.author.nickname} 프로필`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 내용 영역 */}
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          {/* 이름 + 날짜 + 수정/삭제 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold leading-snug tracking-tight text-gray-600">
                {comment.author.nickname}
              </span>
              <span className="text-xs leading-snug tracking-tight text-gray-400">
                {formatCommentDate(comment.created_at)}
              </span>
            </div>
            {isAuthor && !isEditing && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  수정
                </button>
                <span className="text-gray-250">|</span>
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  disabled={isDeleting}
                  className="text-xs text-gray-400 hover:text-danger cursor-pointer transition-colors disabled:cursor-not-allowed"
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          {/* 댓글 내용 또는 수정 폼 */}
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3 items-end">
              <CommentInput value={editContent} onChange={setEditContent} />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditContent(comment.content);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                >
                  취소
                </button>
                <CommentSubmitButton
                  label="수정"
                  onClick={() => handleEditSubmit({ preventDefault: () => {} } as FormEvent)}
                  disabled={
                    editContent.trim().length === 0 ||
                    editContent.length > COMMENT_MAX_LENGTH ||
                    isUpdating
                  }
                />
              </div>
            </form>
          ) : (
            <p className="text-base leading-snug tracking-tight text-gray-primary">
              {comment.content}
            </p>
          )}
        </div>

        {/* 구분선 (프로필 옆부터) */}
        {showDivider && <div className="w-full h-px bg-gray-250" />}
      </div>
    </div>
  );
}
