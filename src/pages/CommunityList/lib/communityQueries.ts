// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801
// Figma-states: communityList

import { queryOptions, useQuery } from '@tanstack/react-query';
import type { CommunityPostsParams, CommunityPostsResponse } from './types';

async function fetchCommunityPosts(
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

  const response = await fetch(`/api/community/posts?${searchParams}`);
  if (!response.ok) {
    throw new Error('게시글 목록을 불러오는데 실패했습니다.');
  }
  return response.json();
}

export const communityQueries = {
  all: () => ['community'] as const,
  lists: () => [...communityQueries.all(), 'list'] as const,
  list: (params: CommunityPostsParams) =>
    queryOptions({
      queryKey: [...communityQueries.lists(), params] as const,
      queryFn: () => fetchCommunityPosts(params),
    }),
};

export function useCommunityPostsQuery(params: CommunityPostsParams) {
  return useQuery(communityQueries.list(params));
}
