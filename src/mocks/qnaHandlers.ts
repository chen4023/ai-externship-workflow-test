import { http, HttpResponse } from 'msw';
import { MOCK_QNA_QUESTIONS } from '../pages/QnaList/lib/mockData';
import type { QnaListResponse } from '../pages/QnaList/lib/types';

export const qnaHandlers = [
  http.get('/api/v1/qna/questions', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const size = Number(url.searchParams.get('size') ?? '10');
    const searchKeyword = url.searchParams.get('search_keyword') ?? '';
    const answerStatus = url.searchParams.get('answer_status') ?? '';
    const sort = url.searchParams.get('sort') ?? 'latest';

    let filtered = [...MOCK_QNA_QUESTIONS];

    // 답변 상태 필터링
    if (answerStatus === 'answered') {
      filtered = filtered.filter((q) => q.answer_count > 0);
    } else if (answerStatus === 'unanswered') {
      filtered = filtered.filter((q) => q.answer_count === 0);
    }

    // 검색 필터링
    if (searchKeyword.trim().length > 0) {
      filtered = filtered.filter(
        (q) =>
          q.title.includes(searchKeyword) ||
          q.content_preview.includes(searchKeyword),
      );
    }

    // 정렬
    if (sort === 'count') {
      filtered.sort((a, b) => b.view_count - a.view_count);
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    // 페이지네이션
    const totalCount = filtered.length;
    const start = (page - 1) * size;
    const paginatedResults = filtered.slice(start, start + size);

    const nextPage = start + size < totalCount ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const response: QnaListResponse = {
      count: totalCount,
      next: nextPage
        ? `${url.origin}/api/v1/qna/questions?page=${nextPage}&size=${size}`
        : null,
      previous: prevPage
        ? `${url.origin}/api/v1/qna/questions?page=${prevPage}&size=${size}`
        : null,
      results: paginatedResults,
    };

    return HttpResponse.json(response);
  }),
];
