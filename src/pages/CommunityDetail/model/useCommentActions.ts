// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createComment,
  updateComment,
  deleteComment,
} from '../../../api/communityDetail';
import { communityDetailQueries } from '../lib/communityDetailQueries';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityDetailQueries.comments(postId).queryKey,
      });
    },
  });
}

export function useUpdateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateComment(postId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityDetailQueries.comments(postId).queryKey,
      });
    },
  });
}

export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityDetailQueries.comments(postId).queryKey,
      });
    },
  });
}
