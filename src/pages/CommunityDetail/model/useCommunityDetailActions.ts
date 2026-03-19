// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deletePost, likePost, unlikePost } from '../../../api/communityDetail';
import { communityDetailQueries } from '../lib/communityDetailQueries';

export function useDeletePost(postId: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityDetailQueries.all(),
      });
      navigate('/community');
    },
  });
}

export function useLikePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityDetailQueries.detail(postId).queryKey,
      });
    },
  });
}

export function useUnlikePost(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityDetailQueries.detail(postId).queryKey,
      });
    },
  });
}
