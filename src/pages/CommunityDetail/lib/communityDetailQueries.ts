// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchPostDetail, fetchComments } from '../../../api/communityDetail';

export const communityDetailQueries = {
  all: () => ['communityDetail'] as const,

  detail: (postId: number) =>
    queryOptions({
      queryKey: [...communityDetailQueries.all(), 'detail', postId] as const,
      queryFn: () => fetchPostDetail(postId),
      enabled: postId > 0,
    }),

  comments: (postId: number, page = 1, pageSize = 100) =>
    queryOptions({
      queryKey: [
        ...communityDetailQueries.all(),
        'comments',
        postId,
        page,
        pageSize,
      ] as const,
      queryFn: () => fetchComments(postId, { page, page_size: pageSize }),
      enabled: postId > 0,
    }),
};

export function usePostDetailQuery(postId: number) {
  return useQuery(communityDetailQueries.detail(postId));
}

export function useCommentsQuery(postId: number, page = 1, pageSize = 100) {
  return useQuery(communityDetailQueries.comments(postId, page, pageSize));
}
