// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { useState, type FormEvent } from 'react';
import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';
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
}

export function CommentCard({
  comment,
  currentUserId,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isAuthor = currentUserId === comment.author.id;

  const formattedDate = new Date(comment.created_at).toLocaleDateString(
    'ko-KR',
    { year: 'numeric', month: '2-digit', day: '2-digit' },
  );

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editContent.trim().length === 0) return;
    if (editContent.length > COMMENT_MAX_LENGTH) return;
    onUpdate(comment.id, editContent.trim());
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProfileImage
            src={comment.author.profile_img_url}
            alt={`${comment.author.nickname} 프로필`}
            size="sm"
          />
          <span className="text-sm font-semibold leading-snug tracking-tight text-gray-primary">
            {comment.author.nickname}
          </span>
          <span className="text-xs leading-snug tracking-tight text-gray-400">
            {formattedDate}
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

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 items-end">
          <CommentInput value={editContent} onChange={setEditContent} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancelEdit}
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
        <p className="text-sm leading-relaxed tracking-tight text-gray-700">
          {comment.content}
        </p>
      )}
    </div>
  );
}
