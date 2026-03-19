// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801
// Figma-states: communityList

import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchCommunityPosts } from '../../../api/community';
import type { CommunityPostsParams } from './types';

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
