import type { QnaListParams, QnaListResponse } from '../pages/QnaList/lib/types';
import type {
  QnaDetailResponse,
  CreateAnswerRequest,
  CreateAnswerResponse,
  AcceptAnswerResponse,
  CreateAnswerCommentRequest,
  CreateAnswerCommentResponse,
} from '../pages/QnaDetail/lib/types';
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

export async function fetchQnaDetail(
  questionId: number,
): Promise<QnaDetailResponse> {
  const { data } = await authApi.get<QnaDetailResponse>(
    `${API_BASE}/questions/${questionId}`,
  );

  return data;
}

export async function createAnswer(
  questionId: number,
  body: CreateAnswerRequest,
): Promise<CreateAnswerResponse> {
  const { data } = await authApi.post<CreateAnswerResponse>(
    `${API_BASE}/questions/${questionId}/answers`,
    body,
  );

  return data;
}

export async function acceptAnswer(
  answerId: number,
): Promise<AcceptAnswerResponse> {
  const { data } = await authApi.post<AcceptAnswerResponse>(
    `${API_BASE}/answers/${answerId}/accept`,
  );

  return data;
}

export async function createAnswerComment(
  answerId: number,
  body: CreateAnswerCommentRequest,
): Promise<CreateAnswerCommentResponse> {
  const { data } = await authApi.post<CreateAnswerCommentResponse>(
    `${API_BASE}/answers/${answerId}/comments`,
    body,
  );

  return data;
}
