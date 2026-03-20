// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081
// Figma-states: qnaDetail

import { type FormEvent, useState } from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import { CommentInput } from '../../../shared/ui/CommentInput/CommentInput';
import { CommentSubmitButton } from '../../../shared/ui/CommentSubmitButton/CommentSubmitButton';
import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';
import type { QnaAnswer } from '../lib/types';

interface AnswerCardProps {
  answer: QnaAnswer;
  hasAdoptedAnswer: boolean;
  onAdopt: (answerId: number) => void;
  isAdopting: boolean;
  onSubmitComment: (answerId: number, content: string) => void;
  isSubmittingComment: boolean;
}

export function AnswerCard({
  answer,
  hasAdoptedAnswer,
  onAdopt,
  isAdopting,
  onSubmitComment,
  isSubmittingComment,
}: AnswerCardProps) {
  const [commentContent, setCommentContent] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    if (commentContent.trim().length === 0) return;
    onSubmitComment(answer.id, commentContent);
    setCommentContent('');
    setShowCommentForm(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage
            size="sm"
            src={answer.author.profile_image_url ?? undefined}
          />
          <span className="text-sm font-semibold leading-snug tracking-tight text-gray-primary">
            {answer.author.nickname}
          </span>
          <span className="text-xs leading-snug tracking-tight text-gray-400">
            {answer.created_at}
          </span>
        </div>
        {answer.is_adopted && (
          <span className="text-sm font-semibold text-success">
            채택됨
          </span>
        )}
      </div>

      <p className="text-base leading-relaxed tracking-tight text-gray-700 whitespace-pre-wrap">
        {answer.content}
      </p>

      <div className="flex items-center gap-2">
        {!hasAdoptedAnswer && !answer.is_adopted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAdopt(answer.id)}
            disabled={isAdopting}
          >
            채택하기
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCommentForm((prev) => !prev)}
        >
          댓글 {answer.comments.length > 0 ? answer.comments.length : ''}
        </Button>
      </div>

      {/* Comments list */}
      {answer.comments.length > 0 && (
        <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100">
          {answer.comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ProfileImage
                  size="sm"
                  src={comment.author.profile_image_url ?? undefined}
                />
                <span className="text-xs font-semibold leading-snug tracking-tight text-gray-primary">
                  {comment.author.nickname}
                </span>
                <span className="text-xs leading-snug tracking-tight text-gray-400">
                  {comment.created_at}
                </span>
              </div>
              <p className="text-sm leading-relaxed tracking-tight text-gray-700 pl-8">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      {showCommentForm && (
        <form onSubmit={handleSubmitComment} className="flex flex-col gap-2 pt-2">
          <CommentInput
            placeholder="댓글을 입력해 주세요."
            value={commentContent}
            onChange={setCommentContent}
          />
          <div className="flex justify-end">
            <CommentSubmitButton
              type="submit"
              label="댓글 등록"
              disabled={commentContent.trim().length === 0 || isSubmittingComment}
              onClick={handleSubmitComment}
            />
          </div>
        </form>
      )}
    </div>
  );
}
