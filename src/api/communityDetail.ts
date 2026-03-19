import type {
  PostDetail,
  CommentsResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  DeletePostResponse,
  LikeResponse,
} from '../pages/CommunityDetail/lib/types';
import { authApi, publicApi } from './instance';

const API_BASE = '/api/v1/posts';

/** 게시글 상세 조회 */
export async function fetchPostDetail(postId: number): Promise<PostDetail> {
  const { data } = await publicApi.get<PostDetail>(`${API_BASE}/${postId}`);
  return data;
}

/** 게시글 삭제 */
export async function deletePost(postId: number): Promise<DeletePostResponse> {
  const { data } = await authApi.delete<DeletePostResponse>(
    `${API_BASE}/${postId}`,
  );
  return data;
}

/** 댓글 목록 조회 */
export async function fetchComments(
  postId: number,
  params?: { page?: number; page_size?: number },
): Promise<CommentsResponse> {
  const { data } = await publicApi.get<CommentsResponse>(
    `${API_BASE}/${postId}/comments`,
    { params },
  );
  return data;
}

/** 댓글 작성 */
export async function createComment(
  postId: number,
  body: CreateCommentRequest,
): Promise<{ detail: string }> {
  const { data } = await authApi.post<{ detail: string }>(
    `${API_BASE}/${postId}/comments`,
    body,
  );
  return data;
}

/** 댓글 수정 */
export async function updateComment(
  postId: number,
  commentId: number,
  body: UpdateCommentRequest,
): Promise<{ id: number; content: string; updated_at: string }> {
  const { data } = await authApi.put<{
    id: number;
    content: string;
    updated_at: string;
  }>(`${API_BASE}/${postId}/comments/${commentId}`, body);
  return data;
}

/** 댓글 삭제 */
export async function deleteComment(
  postId: number,
  commentId: number,
): Promise<{ detail: string }> {
  const { data } = await authApi.delete<{ detail: string }>(
    `${API_BASE}/${postId}/comments/${commentId}`,
  );
  return data;
}

/** 좋아요 */
export async function likePost(postId: number): Promise<LikeResponse> {
  const { data } = await authApi.post<LikeResponse>(
    `${API_BASE}/${postId}/like`,
  );
  return data;
}

/** 좋아요 취소 */
export async function unlikePost(postId: number): Promise<LikeResponse> {
  const { data } = await authApi.delete<LikeResponse>(
    `${API_BASE}/${postId}/like`,
  );
  return data;
}
