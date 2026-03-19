import type {
  CommunityPostsParams,
  CommunityPostsResponse,
} from '../pages/CommunityList/lib/types';

const API_BASE = '/api/community';

export async function fetchCommunityPosts(
  params: CommunityPostsParams,
): Promise<CommunityPostsResponse> {
  const searchParams = new URLSearchParams({
    category: params.category,
    searchType: params.searchType,
    searchQuery: params.searchQuery,
    sort: params.sort,
    page: String(params.page),
    limit: String(params.limit),
  });

  const response = await fetch(`${API_BASE}/posts?${searchParams}`);

  if (!response.ok) {
    throw new Error('게시글 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
}
