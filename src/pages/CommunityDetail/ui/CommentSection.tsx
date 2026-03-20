// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { useState, type FormEvent } from 'react';
import { CommentInput } from '../../../shared/ui/CommentInput/CommentInput';
import { CommentSubmitButton } from '../../../shared/ui/CommentSubmitButton/CommentSubmitButton';
import { SortModal } from '../../../shared/ui/SortModal/SortModal';
import { Loading } from '../../../shared/ui/Loading/Loading';
import { CommentCard } from './CommentCard';
import { SORT_OPTIONS, COMMENT_MAX_LENGTH } from '../lib/constants';
import type { Comment } from '../lib/types';

interface CommentSectionProps {
  comments: Comment[];
  totalCount: number;
  isLoading: boolean;
  isLoggedIn: boolean;
  currentUserId: number | null;
  onCreateComment: (content: string) => void;
  onUpdateComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function CommentSection({
  comments,
  totalCount,
  isLoading,
  isLoggedIn,
  currentUserId,
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
  isCreating,
  isUpdating,
  isDeleting,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [commentSort, setCommentSort] = useState('latest');

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim().length === 0) return;
    if (newComment.length > COMMENT_MAX_LENGTH) return;
    onCreateComment(newComment.trim());
    setNewComment('');
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 댓글 헤더: 💬 댓글 N개 + 최신순 */}
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-3">
          <MessageCircleIcon />
          <span className="text-xl font-bold leading-tight text-gray-primary">
            댓글 {totalCount}개
          </span>
        </div>
        <SortModal
          options={[...SORT_OPTIONS]}
          value={commentSort}
          onChange={setCommentSort}
        />
      </div>

      {/* 댓글 작성 (로그인 시) */}
      {isLoggedIn && (
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col gap-3 items-end"
        >
          <CommentInput value={newComment} onChange={setNewComment} />
          <CommentSubmitButton
            type="submit"
            disabled={
              newComment.trim().length === 0 ||
              newComment.length > COMMENT_MAX_LENGTH ||
              isCreating
            }
          />
        </form>
      )}

      {/* 댓글 목록 */}
      {isLoading ? (
        <Loading className="py-10" />
      ) : (
        <div className="flex flex-col gap-6">
          {sortedComments.map((comment, i) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
              showDivider={i < sortedComments.length - 1}
            />
          ))}
          {sortedComments.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MessageCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
