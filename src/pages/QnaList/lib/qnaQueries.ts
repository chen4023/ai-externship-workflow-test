// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893
// Figma-states: qnaList

import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchQnaQuestions } from '../../../api/qna';
import type { QnaListParams } from './types';

export const qnaQueries = {
  all: () => ['qna'] as const,
  lists: () => [...qnaQueries.all(), 'list'] as const,
  list: (params: QnaListParams) =>
    queryOptions({
      queryKey: [...qnaQueries.lists(), params] as const,
      queryFn: () => fetchQnaQuestions(params),
    }),
};

export function useQnaQuestionsQuery(params: QnaListParams) {
  return useQuery(qnaQueries.list(params));
}
