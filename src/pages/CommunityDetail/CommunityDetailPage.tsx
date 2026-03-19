// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../shared/ui/Header/Header';
import { Footer } from '../../shared/ui/Footer/Footer';
import { ConfirmModal } from '../../shared/ui/Modal/Modal';
import { Loading } from '../../shared/ui/Loading/Loading';
import { PostHeader } from './ui/PostHeader';
import { PostContent } from './ui/PostContent';
import { CommentSection } from './ui/CommentSection';
import {
  usePostDetailQuery,
  useCommentsQuery,
} from './lib/communityDetailQueries';
import {
  useDeletePost,
  useLikePost,
  useUnlikePost,
} from './model/useCommunityDetailActions';
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from './model/useCommentActions';

function getCurrentUserId(): number | null {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (!parts[1]) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload.user_id ?? null;
  } catch {
    return null;
  }
}

export function CommunityDetailPage() {
  const { postId: postIdParam } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const postId = Number(postIdParam);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const currentUserId = getCurrentUserId();
  const isLoggedIn = currentUserId !== null;

  const { data: post, isLoading: isPostLoading } = usePostDetailQuery(postId);
  const { data: commentsData, isLoading: isCommentsLoading } =
    useCommentsQuery(postId);

  const deletePostMutation = useDeletePost(postId);
  const likePostMutation = useLikePost(postId);
  const unlikePostMutation = useUnlikePost(postId);
  const createCommentMutation = useCreateComment(postId);
  const updateCommentMutation = useUpdateComment(postId);
  const deleteCommentMutation = useDeleteComment(postId);

  const isAuthor = post ? currentUserId === post.author.id : false;

  const handleDeletePost = () => {
    setShowDeleteModal(false);
    deletePostMutation.mutate();
  };

  const handleLikeToggle = () => {
    if (!isLoggedIn) return;
    likePostMutation.mutate(undefined, {
      onError: () => {
        unlikePostMutation.mutate();
      },
    });
  };

  if (isPostLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant={isLoggedIn ? 'registered' : 'guest'} />
        <main className="flex-1 flex items-center justify-center">
          <Loading />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header variant={isLoggedIn ? 'registered' : 'guest'} />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant={isLoggedIn ? 'registered' : 'guest'} />
      <main className="flex-1 flex justify-center py-10">
        <div className="flex flex-col gap-8 w-300">
          <PostHeader
            post={post}
            isAuthor={isAuthor}
            onEdit={() => navigate(`/community/${postId}/edit`)}
            onDelete={() => setShowDeleteModal(true)}
          />

          <div className="w-full h-px bg-gray-200" />

          <PostContent
            content={post.content}
            likeCount={post.like_count}
            viewCount={post.view_count}
            isLoggedIn={isLoggedIn}
            onLikeToggle={handleLikeToggle}
            isLikeLoading={
              likePostMutation.isPending || unlikePostMutation.isPending
            }
          />

          <div className="w-full h-px bg-gray-200" />

          <CommentSection
            comments={commentsData?.results ?? []}
            totalCount={commentsData?.count ?? 0}
            isLoading={isCommentsLoading}
            isLoggedIn={isLoggedIn}
            currentUserId={currentUserId}
            onCreateComment={(content) =>
              createCommentMutation.mutate(content)
            }
            onUpdateComment={(commentId, content) =>
              updateCommentMutation.mutate({ commentId, content })
            }
            onDeleteComment={(commentId) =>
              deleteCommentMutation.mutate(commentId)
            }
            isCreating={createCommentMutation.isPending}
            isUpdating={updateCommentMutation.isPending}
            isDeleting={deleteCommentMutation.isPending}
          />
        </div>
      </main>
      <Footer />

      <ConfirmModal
        open={showDeleteModal}
        message="정말 이 게시글을 삭제하시겠습니까?"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={handleDeletePost}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
