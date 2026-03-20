// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081
// Figma-states: qnaDetail

import { useParams } from 'react-router-dom';
import { useQnaDetailQuery } from '../lib/qnaDetailQueries';

export function useQnaDetail() {
  const { questionId } = useParams<{ questionId: string }>();
  const id = Number(questionId ?? '0');

  const { data, isLoading, isError, error } = useQnaDetailQuery(id);

  return {
    questionId: id,
    detail: data ?? null,
    isLoading,
    isError,
    error,
  };
}
