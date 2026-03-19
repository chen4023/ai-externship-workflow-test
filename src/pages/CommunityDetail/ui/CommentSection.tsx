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
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
          댓글 {totalCount}
        </p>
        <SortModal
          options={[...SORT_OPTIONS]}
          value={commentSort}
          onChange={setCommentSort}
        />
      </div>

      {isLoggedIn && (
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col gap-2 items-end"
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

      {isLoading ? (
        <Loading className="py-10" />
      ) : (
        <div className="flex flex-col gap-4">
          {sortedComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
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
