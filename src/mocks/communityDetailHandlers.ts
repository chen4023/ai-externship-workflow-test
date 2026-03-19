import { http, HttpResponse } from 'msw';
import type {
  PostDetail,
  CommentsResponse,
  Comment,
} from '../pages/CommunityDetail/lib/types';

const MOCK_POST: PostDetail = {
  id: 1,
  title: '프론트엔드 개발자 취업 준비 팁 공유합니다',
  author: {
    id: 1,
    nickname: '김개발',
    profile_img_url: '',
  },
  category: {
    id: 1,
    name: '자유 게시판',
  },
  content:
    '안녕하세요, 최근 프론트엔드 개발자로 취업에 성공한 김개발입니다.\n\n제가 준비하면서 도움이 되었던 내용들을 정리해봤습니다. 포트폴리오는 2~3개 프로젝트를 깊이 있게 만드는 것이 중요하고, 기술 면접에서는 JavaScript 기초와 React 동작 원리를 많이 물어봤습니다.\n\n도움이 되셨으면 좋겠습니다. 궁금한 점 있으면 댓글로 남겨주세요!',
  view_count: 128,
  like_count: 15,
  created_at: '2025-03-15T09:00:00+09:00',
  updated_at: '2025-03-15T09:00:00+09:00',
};

let mockComments: Comment[] = [
  {
    id: 1,
    author: {
      id: 2,
      nickname: '이수강',
      profile_img_url: '',
    },
    tagged_users: [],
    content: '좋은 글 감사합니다! 많은 도움이 되었어요.',
    created_at: '2025-03-15T10:00:00+09:00',
    updated_at: '2025-03-15T10:00:00+09:00',
  },
  {
    id: 2,
    author: {
      id: 3,
      nickname: '박코딩',
      profile_img_url: '',
    },
    tagged_users: [],
    content: '저도 비슷한 경험을 했는데 공감이 됩니다.',
    created_at: '2025-03-15T11:00:00+09:00',
    updated_at: '2025-03-15T11:00:00+09:00',
  },
];

let nextCommentId = 3;

export const communityDetailHandlers = [
  // 게시글 상세 조회
  http.get('/api/v1/posts/:postId', ({ params }) => {
    const postId = Number(params.postId);
    if (Number.isNaN(postId)) {
      return HttpResponse.json(
        { error_detail: '게시글을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }
    return HttpResponse.json({ ...MOCK_POST, id: postId });
  }),

  // 게시글 삭제
  http.delete('/api/v1/posts/:postId', () => {
    return HttpResponse.json({ detail: '게시글이 삭제되었습니다.' });
  }),

  // 댓글 목록 조회
  http.get('/api/v1/posts/:postId/comments', () => {
    const response: CommentsResponse = {
      count: mockComments.length,
      next: null,
      previous: null,
      results: mockComments,
    };
    return HttpResponse.json(response);
  }),

  // 댓글 작성
  http.post('/api/v1/posts/:postId/comments', async ({ request }) => {
    const body = (await request.json()) as { content: string };
    const newComment: Comment = {
      id: nextCommentId++,
      author: {
        id: 1,
        nickname: '김개발',
        profile_img_url: '',
      },
      tagged_users: [],
      content: body.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockComments = [newComment, ...mockComments];
    return HttpResponse.json(
      { detail: '댓글이 등록되었습니다.' },
      { status: 201 },
    );
  }),

  // 댓글 수정
  http.put(
    '/api/v1/posts/:postId/comments/:commentId',
    async ({ params, request }) => {
      const commentId = Number(params.commentId);
      const body = (await request.json()) as { content: string };
      const comment = mockComments.find((c) => c.id === commentId);
      if (!comment) {
        return HttpResponse.json(
          { error_detail: '해당 댓글을 찾을 수 없습니다.' },
          { status: 404 },
        );
      }
      comment.content = body.content;
      comment.updated_at = new Date().toISOString();
      return HttpResponse.json({
        id: comment.id,
        content: comment.content,
        updated_at: comment.updated_at,
      });
    },
  ),

  // 댓글 삭제
  http.delete('/api/v1/posts/:postId/comments/:commentId', ({ params }) => {
    const commentId = Number(params.commentId);
    mockComments = mockComments.filter((c) => c.id !== commentId);
    return HttpResponse.json({ detail: '댓글이 삭제되었습니다.' });
  }),

  // 좋아요
  http.post('/api/v1/posts/:postId/like', () => {
    MOCK_POST.like_count += 1;
    return HttpResponse.json(
      { detail: '좋아요가 등록되었습니다.' },
      { status: 201 },
    );
  }),

  // 좋아요 취소
  http.delete('/api/v1/posts/:postId/like', () => {
    MOCK_POST.like_count = Math.max(0, MOCK_POST.like_count - 1);
    return HttpResponse.json({ detail: '좋아요가 취소되었습니다.' });
  }),
];
