// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081
// Figma-states: qnaDetail

import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchQnaDetail } from '../../../api/qna';

export const qnaDetailQueries = {
  all: () => ['qna'] as const,
  details: () => [...qnaDetailQueries.all(), 'detail'] as const,
  detail: (questionId: number) =>
    queryOptions({
      queryKey: [...qnaDetailQueries.details(), questionId] as const,
      queryFn: () => fetchQnaDetail(questionId),
      enabled: questionId > 0,
    }),
};

export function useQnaDetailQuery(questionId: number) {
  return useQuery(qnaDetailQueries.detail(questionId));
}
