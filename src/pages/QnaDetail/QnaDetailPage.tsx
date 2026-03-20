// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081&m=dev
// Figma-states: qnaDetail

import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommentInput } from '../../shared/ui/CommentInput/CommentInput';
import { CommentSubmitButton } from '../../shared/ui/CommentSubmitButton/CommentSubmitButton';
import { Loading } from '../../shared/ui/Loading/Loading';
import { ProfileImage } from '../../shared/ui/ProfileImage/ProfileImage';
import { useQnaDetail } from './model/useQnaDetail';
import { useAnswerActions } from './model/useAnswerActions';
import { AnswerCard } from './ui/AnswerCard';

export function QnaDetailPage() {
  const { questionId, detail, isLoading, isError } = useQnaDetail();
  const {
    submitAnswer,
    isSubmittingAnswer,
    adoptAnswer,
    isAdopting,
    submitComment,
    isSubmittingComment,
  } = useAnswerActions(questionId);

  const [answerContent, setAnswerContent] = useState('');

  const handleSubmitAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (answerContent.trim().length === 0) return;
    submitAnswer(
      { content: answerContent },
      { onSuccess: () => setAnswerContent('') },
    );
  };

  const handleAdopt = (answerId: number) => {
    adoptAnswer(answerId);
  };

  const handleSubmitComment = (answerId: number, content: string) => {
    submitComment({ answerId, body: { content } });
  };

  if (isLoading) {
    return <Loading className="min-h-[400px]" />;
  }

  if (isError || !detail) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <p className="text-base text-gray-500">
          질문을 불러올 수 없습니다.
        </p>
        <Link
          to="/qna"
          className="text-sm text-primary hover:underline"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const hasAdoptedAnswer = detail.answers.some((a) => a.is_adopted);

  return (
    <div className="flex flex-col gap-8 w-300">
      {/* Back link */}
      <Link
        to="/qna"
        className="flex items-center gap-2 text-sm tracking-tight text-gray-500 hover:text-gray-700 transition-colors w-fit"
      >
        &larr; 목록으로
      </Link>

      {/* Question */}
      <article className="flex flex-col gap-6 pb-8 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
            {detail.title}
          </h1>
          <div className="flex items-center gap-3">
            <ProfileImage
              size="sm"
              src={detail.author.profile_image_url ?? undefined}
            />
            <span className="text-sm leading-snug tracking-tight text-gray-600">
              {detail.author.nickname}
            </span>
            <span className="text-xs leading-snug tracking-tight text-gray-400">
              {detail.created_at}
            </span>
          </div>
        </div>
        <p className="text-base leading-relaxed tracking-tight text-gray-700 whitespace-pre-wrap">
          {detail.content}
        </p>
      </article>

      {/* Answers */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-gray-primary">
          답변 {detail.answers.length}
        </h2>

        {detail.answers.length === 0 && (
          <p className="text-sm text-gray-400 py-4">
            아직 답변이 없습니다. 첫 번째 답변을 작성해보세요.
          </p>
        )}

        {detail.answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            hasAdoptedAnswer={hasAdoptedAnswer}
            onAdopt={handleAdopt}
            isAdopting={isAdopting}
            onSubmitComment={handleSubmitComment}
            isSubmittingComment={isSubmittingComment}
          />
        ))}
      </section>

      {/* Answer input */}
      <form
        onSubmit={handleSubmitAnswer}
        className="flex flex-col gap-3 pt-6 border-t border-gray-200"
      >
        <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary">
          답변 작성
        </p>
        <CommentInput
          placeholder="답변을 입력해 주세요."
          value={answerContent}
          onChange={setAnswerContent}
        />
        <div className="flex justify-end">
          <CommentSubmitButton
            type="submit"
            label="답변 등록"
            disabled={answerContent.trim().length === 0 || isSubmittingAnswer}
            onClick={handleSubmitAnswer}
          />
        </div>
      </form>
    </div>
  );
}
