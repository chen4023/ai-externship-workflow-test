import { http, HttpResponse } from 'msw';
import { MOCK_POSTS } from '../pages/CommunityList/lib/mockData';
import type { CommunityPostsResponse } from '../pages/CommunityList/lib/types';

export const communityHandlers = [
  http.get('/api/community/posts', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') ?? '전체';
    const searchType = url.searchParams.get('searchType') ?? 'all';
    const searchQuery = url.searchParams.get('searchQuery') ?? '';
    const sort = url.searchParams.get('sort') ?? 'latest';
    const page = Number(url.searchParams.get('page') ?? '1');
    const limit = Number(url.searchParams.get('limit') ?? '10');

    let filtered = [...MOCK_POSTS];

    // 카테고리 필터링
    if (category !== '전체') {
      filtered = filtered.filter((p) => p.category === category);
    }

    // 검색 필터링
    if (searchQuery.trim().length > 0) {
      if (searchType === 'title') {
        filtered = filtered.filter((p) => p.title.includes(searchQuery));
      } else if (searchType === 'content') {
        filtered = filtered.filter((p) => p.content.includes(searchQuery));
      } else {
        filtered = filtered.filter(
          (p) => p.title.includes(searchQuery) || p.content.includes(searchQuery),
        );
      }
    }

    // 정렬
    if (sort === 'comments') {
      filtered.sort((a, b) => b.commentCount - a.commentCount);
    }

    // 페이지네이션
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const start = (page - 1) * limit;
    const paginatedPosts = filtered.slice(start, start + limit);

    const response: CommunityPostsResponse = {
      posts: paginatedPosts,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return HttpResponse.json(response);
  }),
];
