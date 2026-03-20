// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import type { PostDetail } from '../lib/types';

interface PostHeaderProps {
  post: PostDetail;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return new Date(dateStr).toLocaleDateString('ko-KR');
}

export function PostHeader({
  post,
  isAuthor,
  onEdit,
  onDelete,
}: PostHeaderProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-6">
        {/* 카테고리 */}
        <p className="text-xl font-bold leading-snug tracking-tight text-primary">
          {post.category.name}
        </p>

        {/* 제목 + 프로필 */}
        <div className="flex items-start justify-between gap-15">
          <h1 className="flex-1 text-4xl font-bold leading-snug tracking-tight text-gray-primary">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
              {post.author.profile_img_url && (
                <img
                  src={post.author.profile_img_url}
                  alt={`${post.author.nickname} 프로필`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="text-base font-semibold leading-snug tracking-tight text-gray-600">
              {post.author.nickname}
            </span>
          </div>
        </div>

        {/* 메타 정보: 조회수 / 좋아요 / 시간 */}
        <div className="flex items-center text-base leading-snug tracking-tight text-gray-400">
          <span>조회수 {post.view_count}</span>
          <span className="mx-1 text-gray-200" aria-hidden="true">
            ·
          </span>
          <span>좋아요 {post.like_count}</span>
          <span className="mx-1 text-gray-200" aria-hidden="true">
            ·
          </span>
          <span>{formatRelativeTime(post.created_at)}</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-px bg-gray-250" />

      {/* 수정/삭제 (작성자만) */}
      {isAuthor && (
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={onEdit}
            className="text-sm leading-snug tracking-tight text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            수정
          </button>
          <span className="text-gray-250" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            onClick={onDelete}
            className="text-sm leading-snug tracking-tight text-gray-400 hover:text-danger cursor-pointer transition-colors"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
