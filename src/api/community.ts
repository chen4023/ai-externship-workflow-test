import type {
  CommunityPostsParams,
  CommunityPostsResponse,
} from '../pages/CommunityList/lib/types';
import { authApi } from './instance';

const API_BASE = '/api/community';

export async function fetchCommunityPosts(
  params: CommunityPostsParams,
): Promise<CommunityPostsResponse> {
  const { data } = await authApi.get<CommunityPostsResponse>(
    `${API_BASE}/posts`,
    {
      params: {
        category: params.category,
        searchType: params.searchType,
        searchQuery: params.searchQuery,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      },
    },
  );

  return data;
}
