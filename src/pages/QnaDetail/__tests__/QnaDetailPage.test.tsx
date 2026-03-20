import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { QnaDetailPage } from '../QnaDetailPage';
import { MOCK_QNA_DETAIL } from '../lib/mockData';

const server = setupServer(
  http.get('*/api/v1/qna/questions/:questionId', ({ params }) => {
    const questionId = Number(params.questionId);
    if (questionId === 10501) {
      return HttpResponse.json(MOCK_QNA_DETAIL);
    }
    return HttpResponse.json(
      { error_detail: '해당 질문을 찾을 수 없습니다.' },
      { status: 404 },
    );
  }),
  http.post('*/api/v1/qna/questions/:questionId/answers', async () => {
    return HttpResponse.json(
      {
        answer_id: 999,
        question_id: 10501,
        author_id: 1,
        created_at: '2025-03-20 10:00:00',
      },
      { status: 201 },
    );
  }),
  http.post('*/api/v1/qna/answers/:answerId/accept', () => {
    return HttpResponse.json({
      question_id: 10501,
      answer_id: 801,
      is_adopted: true,
    });
  }),
  http.post('*/api/v1/qna/answers/:answerId/comments', () => {
    return HttpResponse.json(
      {
        comment_id: 99999,
        answer_id: 801,
        author_id: 1,
        created_at: '2025-03-20 10:00:00',
      },
      { status: 201 },
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderWithProviders(questionId: string) {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/qna/${questionId}`]}>
        <Routes>
          <Route path="/qna/:questionId" element={<QnaDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('QnaDetailPage', () => {
  it('로딩 상태를 표시한다', () => {
    renderWithProviders('10501');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('질문 상세 데이터를 렌더링한다', async () => {
    renderWithProviders('10501');

    await waitFor(() => {
      expect(
        screen.getByText('Django에서 ForeignKey 역참조는 어떻게 하나요?'),
      ).toBeInTheDocument();
    });

    expect(screen.getAllByText('한솔_회장').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/답변 2/)).toBeInTheDocument();
  });

  it('답변 목록을 렌더링한다', async () => {
    renderWithProviders('10501');

    await waitFor(() => {
      expect(screen.getByText('김멘토')).toBeInTheDocument();
    });

    expect(screen.getByText('이수강')).toBeInTheDocument();
  });

  it('존재하지 않는 질문 시 에러 상태를 표시한다', async () => {
    renderWithProviders('99999');

    await waitFor(() => {
      expect(
        screen.getByText('질문을 불러올 수 없습니다.'),
      ).toBeInTheDocument();
    });

    expect(screen.getByText('목록으로 돌아가기')).toBeInTheDocument();
  });

  it('답변 입력 폼이 존재한다', async () => {
    renderWithProviders('10501');

    await waitFor(() => {
      expect(screen.getByText('답변 작성')).toBeInTheDocument();
    });

    expect(
      screen.getByPlaceholderText('답변을 입력해 주세요.'),
    ).toBeInTheDocument();
    expect(screen.getByText('답변 등록')).toBeInTheDocument();
  });

  it('빈 답변은 제출할 수 없다', async () => {
    renderWithProviders('10501');

    await waitFor(() => {
      expect(screen.getByText('답변 등록')).toBeInTheDocument();
    });

    const submitButton = screen.getByText('답변 등록');
    expect(submitButton).toBeDisabled();
  });

  it('답변 내용을 입력하면 등록 버튼이 활성화된다', async () => {
    const user = userEvent.setup();
    renderWithProviders('10501');

    await waitFor(() => {
      expect(screen.getByText('답변 등록')).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('답변을 입력해 주세요.');
    await user.type(textarea, '테스트 답변입니다.');

    expect(screen.getByText('답변 등록')).not.toBeDisabled();
  });

  it('댓글이 있는 답변에서 댓글을 표시한다', async () => {
    renderWithProviders('10501');

    await waitFor(() => {
      expect(
        screen.getByText('관련 예제 코드도 공유해주실 수 있나요?'),
      ).toBeInTheDocument();
    });
  });

  it('목록으로 링크가 /qna로 연결된다', async () => {
    renderWithProviders('10501');

    await waitFor(() => {
      expect(screen.getByText(/목록으로/)).toBeInTheDocument();
    });

    const backLink = screen.getByText(/목록으로/);
    expect(backLink.closest('a')).toHaveAttribute('href', '/qna');
  });
});
