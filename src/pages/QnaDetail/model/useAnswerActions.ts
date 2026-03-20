// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081
// Figma-states: qnaDetail

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnswer, acceptAnswer, createAnswerComment } from '../../../api/qna';
import { qnaDetailQueries } from '../lib/qnaDetailQueries';
import type { CreateAnswerRequest, CreateAnswerCommentRequest } from '../lib/types';

export function useAnswerActions(questionId: number) {
  const queryClient = useQueryClient();

  const invalidateDetail = () => {
    queryClient.invalidateQueries({
      queryKey: qnaDetailQueries.details(),
    });
  };

  const createAnswerMutation = useMutation({
    mutationFn: (body: CreateAnswerRequest) => createAnswer(questionId, body),
    onSuccess: invalidateDetail,
  });

  const acceptAnswerMutation = useMutation({
    mutationFn: (answerId: number) => acceptAnswer(answerId),
    onSuccess: invalidateDetail,
  });

  const createCommentMutation = useMutation({
    mutationFn: ({
      answerId,
      body,
    }: {
      answerId: number;
      body: CreateAnswerCommentRequest;
    }) => createAnswerComment(answerId, body),
    onSuccess: invalidateDetail,
  });

  return {
    submitAnswer: createAnswerMutation.mutate,
    isSubmittingAnswer: createAnswerMutation.isPending,
    adoptAnswer: acceptAnswerMutation.mutate,
    isAdopting: acceptAnswerMutation.isPending,
    submitComment: createCommentMutation.mutate,
    isSubmittingComment: createCommentMutation.isPending,
  };
}
