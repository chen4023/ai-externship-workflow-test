import type { QnaListParams, QnaListResponse } from '../pages/QnaList/lib/types';
import { authApi } from './instance';

const API_BASE = '/api/v1/qna';

export async function fetchQnaQuestions(
  params: QnaListParams,
): Promise<QnaListResponse> {
  const { data } = await authApi.get<QnaListResponse>(
    `${API_BASE}/questions`,
    {
      params: {
        page: params.page,
        size: params.size,
        search_keyword: params.search_keyword || undefined,
        answer_status: params.answer_status === 'all' ? undefined : params.answer_status,
        sort: params.sort,
      },
    },
  );

  return data;
}
