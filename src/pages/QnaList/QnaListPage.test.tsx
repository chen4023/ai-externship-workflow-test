import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { qnaHandlers } from '../../mocks/qnaHandlers';
import { QnaListPage } from './QnaListPage';

const server = setupServer(...qnaHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/qna']}>
        <QnaListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('QnaListPage', () => {
  it('should render page title', async () => {
    renderPage();
    expect(screen.getByText('질의응답')).toBeInTheDocument();
  });

  it('should render question list after loading', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Django ORM 역참조는 어떻게 사용하나요?')).toBeInTheDocument();
    });
  });

  it('should render search input', () => {
    renderPage();
    expect(screen.getByPlaceholderText('질문 검색')).toBeInTheDocument();
  });

  it('should render answer status tabs', () => {
    renderPage();
    expect(screen.getByText('전체보기')).toBeInTheDocument();
    expect(screen.getByText('답변완료')).toBeInTheDocument();
    expect(screen.getByText('답변 대기중')).toBeInTheDocument();
  });

  it('should render create question button', () => {
    renderPage();
    expect(screen.getByText('질문하기')).toBeInTheDocument();
  });

  it('should filter by answered status when tab clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Django ORM 역참조는 어떻게 사용하나요?')).toBeInTheDocument();
    });

    await user.click(screen.getByText('답변 대기중'));

    await waitFor(() => {
      expect(screen.getByText('Django REST Framework serializer 질문입니다')).toBeInTheDocument();
    });
  });

  it('should render pagination when questions exist', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByLabelText('페이지네이션')).toBeInTheDocument();
    });
  });
});
